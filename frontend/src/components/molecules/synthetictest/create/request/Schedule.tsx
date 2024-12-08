"use client";

import Checkbox from "@/components/atoms/Checkbox";
import Input from "@/components/atoms/Input";
import RadioButton from "@/components/atoms/RadioButton";
import { useState } from "react";

export default function Schedule() {
  return (
    <div>
      <fieldset className="w-12/12 fields border-2 rounded border-gray-600">
        <legend className="text-xl font-bold">Days of the week:</legend>
        <div className="flex justify-start items-center space-x-4 h-12 p-2">
          <Checkbox name="monday" label="Monday" />
          <Checkbox name="tuesday" label="Tuesday" />
          <Checkbox name="wednesday" label="Wednesday" />
          <Checkbox name="thursday" label="Thursday" />
          <Checkbox name="friday" label="Friday" />
          <Checkbox name="saturday" label="Saturday" />
          <Checkbox name="sunday" label="Sunday" />
        </div>
      </fieldset>
      <div className="flex justify-start space-x-4">
        <fieldset className="grid w-4/12 p-2 border-2 rounded border-gray-600">
          <legend className="text-xl font-bold">Interval Type:</legend>
          <div className="flex items-center space-x-4">
            <div className="space-x-2">
              <RadioButton
                id="hour"
                name="intervalType"
                value="hour"
                label="Hour"
              />
            </div>
            <div className="space-x-2">
              <RadioButton
                id="minute"
                name="intervalType"
                value="minute"
                label="Minute"
              />
            </div>
          </div>
        </fieldset>
        <div className="grid w-2/12">
          <span className="text-xl font-bold">Interval:</span>
          <div className="flex space-x-2">
            <Input
              type="number"
              name="interval"
              min={1}
              max={1440}
              className="w-28"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
