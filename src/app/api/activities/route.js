import { NextResponse } from "next/server";

export async function GET(req, res) {
   const { searchParams } = new URL(req.url);
   const query = searchParams.get("keyword");

   if (!query || query?.length < 3) {
      return NextResponse.json({ cities: [] });
   }

   const cities = [
      {
         id: 1,
         name: "Rutin",
         is_ordered_sales: 1,
         is_ordered_purchase: 0,
         created_by: 1,
         updated_by: 47584,
         deleted_by: null,
         is_patient_id: 0,
         created_at: "2020-10-16T00:00:00.000Z",
         updated_at: "2024-02-22T09:55:41.000Z",
         deleted_at: null,
      },
      {
         id: 2,
         name: "BIAS",
         is_ordered_sales: 0,
         is_ordered_purchase: 1,
         created_by: 1,
         updated_by: 47928,
         deleted_by: null,
         is_patient_id: 0,
         created_at: "2020-10-16T00:00:00.000Z",
         updated_at: "2024-01-25T03:59:27.000Z",
         deleted_at: null,
      },

      // Add more cities as needed
   ];

   const filteredCities = cities.filter((city) =>
      city.name.toLowerCase().includes(query.toLowerCase()),
   );

   return NextResponse.json({ data: filteredCities });
}

export const getActivity = async () => {
   const res = await fetch('https://api.smile-indonesia.id/v2/master-activities', {
      headers: new Headers({ 'Authorization': process.env.NEXT_PUBLIC_TOKEN })
   })

   const data = await res.json();
   return data.list;
}