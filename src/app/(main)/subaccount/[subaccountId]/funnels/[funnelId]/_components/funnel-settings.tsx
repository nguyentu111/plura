import React from "react";

import { Funnel, SubAccount } from "@prisma/client";
import { db } from "@/lib/db";
import { getConnectAccountProducts } from "@/lib/stripe/stripe-actions";

import FunnelForm from "@/components/forms/funnel-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FunnelProductsTable from "./funnel-products-table";
import { LucideEdit } from "lucide-react";

interface FunnelSettingsProps {
  subaccountId: string;
  defaultData: Funnel;
}

const FunnelSettings: React.FC<FunnelSettingsProps> = async ({
  subaccountId,
  defaultData,
}) => {
  //CHALLENGE: go connect your stripe to sell products

  const subaccountDetails = await db.subAccount.findUnique({
    where: {
      id: subaccountId,
    },
  });
  if (!subaccountDetails) return;
  const products = subaccountDetails.connectAccountId
    ? await getConnectAccountProducts(subaccountDetails.connectAccountId)
    : [];

  return (
    <div className="flex gap-4 flex-col xl:!flex-row">
      <Card className="flex-1 flex-shrink">
        <CardHeader>
          <CardTitle>Funnel Products</CardTitle>
          <CardDescription>
            Select the products and services you wish to sell on this funnel.
            You can sell one time and recurring products too.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <>
            {subaccountDetails.connectAccountId && !products.length ? (
              <>
                <p className="text-sm">
                  No product found. Add more products in your
                  <a
                    target="_blank"
                    href="https://dashboard.stripe.com/products/create"
                    className="underline ml-1"
                    rel="noreferrer"
                  >
                    stripe product catalog.
                    <LucideEdit
                      size={50}
                      className="!text-muted-foreground absolute top-1/2 left-1/2 opacity-0 transofrm -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 transition-all duration-100"
                    />
                  </a>
                </p>
              </>
            ) : subaccountDetails.connectAccountId && products.length ? (
              <FunnelProductsTable
                defaultData={defaultData}
                products={products}
              />
            ) : (
              "Connect your stripe account to sell products."
            )}
          </>
        </CardContent>
      </Card>

      <FunnelForm subAccountId={subaccountId} defaultData={defaultData} />
    </div>
  );
};

export default FunnelSettings;
