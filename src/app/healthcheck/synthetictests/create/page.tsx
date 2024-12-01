import Request from "@/components/molecules/synthetictest/create/Request";
import Visualize from "@/components/molecules/synthetictest/create/Visualize";
import Template from "@/components/templates/Template";

export default async function Create() {
  return (
    <Template>
      <section className="flex space-x-2">
        <Request />
        <Visualize />
      </section>
    </Template>
  );
}