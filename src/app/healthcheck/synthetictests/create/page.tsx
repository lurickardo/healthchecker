import Request from "@/components/molecules/synthetictest/create/request/Request";
import Visualize from "@/components/molecules/synthetictest/create/visualize/Visualize";
import Template from "@/components/templates/Template";

export default async function Create() {
  return (
    <Template>
      <section className="flex space-x-4 max-h-[52.1rem]">
        <Request />
        <Visualize />
      </section>
    </Template>
  );
}
