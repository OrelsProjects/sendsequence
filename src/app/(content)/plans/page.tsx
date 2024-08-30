"use client";

import React from "react";
import Plan from "./plan";

export default function PlansPage() {
  return (
    <div className="flex flex-col justify-center items-center md:flex-row-reverse md:justify-end md:items-center gap-4">
      <Plan
        planName="Supportive Pinker"
        pricePlan={{
          price: 25,
          interval: "year",
          secondaryInterval: "month",
          secondaryPrice: 3,
          recommended: true,
          discount: 20,
        }}
        items={[
          { name: "Unlimited partners in contract" },
          { name: "Create unqiue challenges" },
          { name: "Future products discount" },
          { name: "Keep support me :)" },
        ]}
        onClick={() => {}}
      />
      <Plan
        planName="Pro Pinker"
        pricePlan={{
          price: 30,
          interval: "one-time",
          discount: 20,
        }}
        items={[
          { name: "Unlimited partners in contract" },
          { name: "Create unqiue challenges" },
          { name: "Support me :)" },
        ]}
        onClick={() => {}}
      />
    </div>
  );
}
