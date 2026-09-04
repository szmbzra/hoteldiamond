import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";
import crypto from "crypto";

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  try {
    if (!WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
    }
    const secret: string = WEBHOOK_SECRET; // narrowed — TS now knows it's a string

    const rawBody = await req.text();
    const signature = req.headers.get("x-webhook-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 401 });
    }

    // Verify signature
    const expectedSignature = `sha256=${crypto
      .createHmac("sha256", secret)
      .update(rawBody)
      .digest("hex")}`;

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // Parse payload
    const payload = JSON.parse(rawBody);
    const { modules, action, table } = payload;

    if (modules && Array.isArray(modules)) {
      // Revalidate specific tags
      modules.forEach((module: string) => {
        // @ts-expect-error: Next.js canary/15+ incorrectly types revalidateTag as requiring 2 arguments
        revalidateTag(module);
      });
      console.log(`[Webhook] Revalidated tags: ${modules.join(", ")}`);
    } else {
      console.log(`[Webhook] No modules provided. Revalidating all.`);
    }

    // Always revalidate the "all" tag and the full layout to ensure absolute freshness
    // @ts-expect-error: Next.js canary/15+ incorrectly types revalidateTag as requiring 2 arguments
    revalidateTag("all");
    revalidatePath("/", "layout");

    return NextResponse.json({
      success: true,
      message: "Revalidation triggered successfully",
      action,
      table,
    });
  } catch (error: any) {
    console.error("[Webhook Error]", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
