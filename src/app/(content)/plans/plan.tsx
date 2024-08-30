"use client";

import React, { useMemo, useState } from "react";
import { MdDiscount } from "react-icons/md";
import { IoIosCheckmarkCircleOutline as ItemCheck } from "react-icons/io";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Divider from "@/components/ui/divider";
import { Switch } from "@/components/ui/switch";

type Interval = "month" | "year" | "one-time";
interface PlanItem {
  name: string;
}

export interface PricePlan {
  price: number;
  items?: PlanItem[];
  secondaryPrice?: number;
  interval: Interval;
  secondaryInterval?: Interval;
  recommended?: boolean;
  discount?: number; // Percentage 1-100 off
}

export interface PlanProps {
  planName: string;
  pricePlan: PricePlan;
  items: PlanItem[];
  className?: string;
  onClick: (planId: string) => void;
}

const ContentContainer = ({
  children,
  className,
  recommended,
}: {
  className?: string;
  recommended?: boolean;
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      "w-full max-w-80 h-fit min-h-[440px] flex flex-col justify-center items-center relative",
      className,
    )}
  >
    <div
      className={cn("w-full h-full bg-primary absolute inset-0 rounded-lg", {
        hidden: !recommended,
      })}
    >
      <div className="w-full h-10 flex flex-row items-center justify-start gap-2 px-4">
        <MdDiscount className="w-3 h-3 fill-background" />
        <span className="font-semibold text-base text-background">
          Recommended
        </span>
      </div>
    </div>

    <div
      className={cn(
        "h-full w-full rounded-lg absolute bottom-0 left-0 z-20 p-[1px] pt-10",
      )}
    >
      <div
        className={cn(
          "w-full h-full rounded-md flex flex-col gap-2",
          "bg-gradient-to-b from-card to-background border border-muted-foreground/20 dark:border-card",
        )}
      >
        {children}
      </div>
    </div>
  </div>
);

export function Tag({
  recommended,
  children,
}: {
  recommended?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "w-fit h-fit flex flex-row items-center justify-start gap-2 px-4 py-1 rounded-full border",
        {
          "border-primary bg-primary/20 dark:bg-primary-darker/70 text-primary font-medium":
            recommended,
          "border-foreground/20 bg-muted-foreground/10 dark:bg-muted-foreground/40 text-foreground/80 dark:text-foreground/90":
            !recommended,
        },
      )}
    >
      {children}
    </div>
  );
}

function Items({
  items,
  recommended,
}: {
  items: PlanItem[];
  recommended?: boolean;
}) {
  return (
    <div className="w-full h-full flex flex-col gap-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="w-full h-full flex flex-row items-center justify-start gap-2"
        >
          <ItemCheck
            className={cn("w-6 h-6", {
              "fill-primary": recommended,
              "fill-foreground": !recommended,
            })}
          />
          <span className="text-xs font-extralight text-foreground/70">
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Plan({
  planName,
  items,
  pricePlan,
  className,
  onClick,
}: PlanProps) {
  const [intervalSelected, setIntervalSelected] = useState(pricePlan.interval);

  const handleIntervalChange = () => {
    if (!pricePlan.secondaryInterval) return;

    if (pricePlan.secondaryInterval === intervalSelected) {
      setIntervalSelected(pricePlan.interval);
    } else {
      setIntervalSelected(pricePlan.secondaryInterval);
    }
  };

  const intervalText = useMemo(() => {
    switch (intervalSelected) {
      case "month":
        return "per month";
      case "year":
        return "annually";
      case "one-time":
        return "one-time";
      default:
        return "";
    }
  }, [intervalSelected]);

  const switchIntervalText = useMemo(() => {
    switch (intervalSelected) {
      case "month":
        return "monthly";
      case "year":
        return "annually";
      default:
        return "";
    }
  }, [intervalSelected]);

  const price = useMemo(() => {
    if (intervalSelected === pricePlan.interval) {
      return pricePlan.price;
    }
    if (intervalSelected === pricePlan.secondaryInterval) {
      return pricePlan.secondaryPrice;
    }
    return pricePlan.price;
  }, [intervalSelected, pricePlan]);

  return (
    <ContentContainer className={className} recommended={pricePlan.recommended}>
      <div className="w-full h-full flex flex-col p-4 gap-6">
        <div className="w-full h-fit flex flex-row justify-between items-center relative">
          <Tag recommended={pricePlan.recommended}>
            <span className="text-sm">{planName}</span>
          </Tag>
          {pricePlan.secondaryInterval && (
            <Switch
              checked={intervalSelected === pricePlan.interval}
              onCheckedChange={handleIntervalChange}
              className={cn({
                "data-[state=checked]:!bg-muted-foreground data-[state=unchecked]:!bg-muted-foreground/20":
                  !pricePlan.recommended,
              })}
            >
              <span className="w-fit text-xs text-muted-foreground/70 text-center absolute -bottom-3">
                {switchIntervalText}
              </span>
            </Switch>
          )}
        </div>
        <div className="w-full h-full flex flex-col gap-5">
          <div className="w-full h-10 flex flex-row items-center justify-start gap-1.5">
            <span className="text-3xl font-medium">${price}</span>
            <span className="text-xs pt-2.5 font-normal text-muted-foreground/70">
              {intervalText}
            </span>
          </div>
          <Divider />
          <Items items={items} recommended={pricePlan.recommended} />
          <div className="w-full h-full flex flex-row items-center justify-between">
            <Button
              className={cn(
                "w-full self-end",
                {
                  "border-muted-foreground/30 dark:border-card bg-card dark:bg-background":
                    !pricePlan.recommended,
                },
                {
                  "bg-gradient-to-t from-primary via-primary to-background/20 dark:to-foreground/20":
                    pricePlan.recommended,
                },
              )}
              onClick={() => onClick(planName)}
              variant={pricePlan.recommended ? "default" : "outline"}
            >
              Select
            </Button>
          </div>
        </div>
      </div>
    </ContentContainer>
  );
}
