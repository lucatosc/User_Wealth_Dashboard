import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { TableData } from "../../components/Table";
import { AccordionTemp, AccordionData } from "@/components/Accordion";
import  Chart  from "react-apexcharts";
import { Button } from "flowbite-react";
import { accordionData } from "@/components/example";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const options = {
    chart: {
        type: 'line',
        height: 350
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    },
    series: [{
        name: 'Sales',
        data: [30, 40, 35, 50, 49, 60]
    }]
  };

  

  return (
    <div className="w-full rounded-2xl flex-1 flex flex-col min-w-80 bg-gray-200 p-3">
      <div className="flex justify-end items-center">
        <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-center">R</div>
      </div>
      <hr/>
      <div className="flex justify-end items-center p-2">
        <Button>Add Assert</Button>
      </div>
      <div className="w-full h-[200px] rounded-sm bg-white">
        <div className="">
        
        </div>
        {/* <Chart options={options} series={options.series} type="line" /> */}
      </div>
      <div className="w-full">
        <Button.Group className="p-2 pl-4">
          <Button color="dark">Tot</Button>
          <Button color="dark">Liquidità</Button>
          <Button color="dark">investimenti</Button>
        </Button.Group>
      </div>
      <div className="w-full h-[360px] border rounded-sm border-black bg-white overflow-scroll">
        <AccordionTemp accordionData={accordionData}/>          
      </div>
    </div>
  );
}
