'use client';

import dynamic from 'next/dynamic';
import { BillingCycle } from './page';

const BillingCycleTabs = dynamic(() => import('./BillingCycleTabs'), { ssr: false });

export default function BillingCycleTabsWrapper({ billingCycle }: { billingCycle: BillingCycle }) {
  return <BillingCycleTabs billingCycle={billingCycle} />;
}
