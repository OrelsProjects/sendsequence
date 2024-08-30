"use client";
// pages/CreateSubscriptionPlan.tsx
import React from "react";
import { useFormik } from "formik";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { CiCircleRemove } from "react-icons/ci";
import { CreateSubscriptionPlan, BillingCycle } from "../../../../models/payment"; // Assuming interfaces are defined and exported
import usePayments from "../../../../lib/hooks/usePayments";
import { toast } from "react-toastify";

const initialBillingCycle: BillingCycle = {
  frequency: { interval_unit: "MONTH", interval_count: 1 },
  tenure_type: "REGULAR",
  sequence: 1,
  total_cycles: 12,
  pricing_scheme: { fixed_price: { value: "10", currency_code: "USD" } },
};

const CreateSubscriptionPlanPage: React.FC = () => {
  const { createSubscriptionPlan } = usePayments();

  const formik = useFormik<CreateSubscriptionPlan>({
    initialValues: {
      taxes: { percentage: "10", inclusive: false },
      name: "",
      description: "",
      billing_cycles: [initialBillingCycle],
      payment_preferences: {
        auto_bill_outstanding: true,
        payment_failure_threshold: 3,
      },
      product_id: "PROD-5FD60555F23243316",
    },
    onSubmit: values => {
      console.log(values);
      const toastId = toast.loading("Creating Subscription Plan...");
      createSubscriptionPlan(values)
        .then(() => {
          toast.success("Subscription Plan Created!");
        })
        .catch(error => {
          toast.error(error.message);
        })
        .finally(() => {
          toast.dismiss(toastId);
        });
    },
  });

  const addBillingCycle = () => {
    const newCycle = {
      ...initialBillingCycle,
      sequence: formik.values.billing_cycles.length + 1,
    };
    const newCycles = [...formik.values.billing_cycles, newCycle];
    formik.setFieldValue("billing_cycles", newCycles);
  };

  const removeBillingCycle = (index: number) => {
    const newCycles = formik.values.billing_cycles.filter(
      (_, i) => i !== index,
    );
    formik.setFieldValue("billing_cycles", newCycles);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Subscription Plan</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            required
          />
        </div>
        {formik.values.billing_cycles.map((cycle, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-lg font-medium">Billing Cycle {index + 1}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Interval Unit
                </label>
                <select
                  name={`billing_cycles[${index}].frequency.interval_unit`}
                  onChange={formik.handleChange}
                  value={cycle.frequency.interval_unit}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 py-1.5"
                  required
                >
                  <option value="MONTH">Month</option>
                  <option value="YEAR">Year</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Interval Count
                </label>
                <Input
                  type="number"
                  name={`billing_cycles[${index}].frequency.interval_count`}
                  onChange={formik.handleChange}
                  value={cycle.frequency.interval_count.toString()}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Sequence
                </label>
                <Input
                  type="number"
                  name={`billing_cycles[${index}].sequence`}
                  onChange={formik.handleChange}
                  value={cycle.sequence.toString()}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Total Cycles
                </label>
                <Input
                  type="number"
                  name={`billing_cycles[${index}].total_cycles`}
                  onChange={formik.handleChange}
                  value={cycle.total_cycles.toString()}
                  required
                />
              </div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <Input
                id={`billing_cycles[${index}].pricing_scheme.fixed_price.value`}
                name={`billing_cycles[${index}].pricing_scheme.fixed_price.value`}
                type="text"
                onChange={formik.handleChange}
                value={cycle.pricing_scheme?.fixed_price.value}
                required
              />
              <CiCircleRemove
                className="text-red-500 cursor-pointer w-8 h-8"
                onClick={() => removeBillingCycle(index)}
              />
            </div>
          </div>
        ))}
        <div className="flex items-center gap-4">
          <Button type="button" variant="outline" onClick={addBillingCycle}>
            Add Billing Cycle
          </Button>
          <Button type="submit">Create Plan</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateSubscriptionPlanPage;
