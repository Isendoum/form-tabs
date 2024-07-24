import { NextResponse } from "next/server";

export async function GET(req, res) {
   const { searchParams } = new URL(req.url);
   const query = searchParams.get("keyword");

   if (!query || query?.length < 3) {
      return NextResponse.json({ cities: [] });
   }

   const cities = [
      {
         type_label: "FASKES",
         id: 278,
         name: "Arjuna Pondok Benda",
         address: "-",
         code: null,
         type: 3,
         status: 1,
         created_at: "2018-06-25T09:06:00.000Z",
         updated_at: "2024-01-16T07:52:13.000Z",
         deleted_at: null,
         province_id: "36",
         regency_id: "3674",
         village_id: null,
         sub_district_id: "367406",
         lat: null,
         lng: "0",
         postal_code: null,
         is_vendor: 0,
         bpom_key: null,
         is_puskesmas: 0,
         rutin_join_date: null,
         is_ayosehat: 0,
         mapping_entity: null,
         entity_tags: [
            {
               id: 13,
               title: "Posyandu",
            },
         ],
         province: {
            id: "36",
            name: "PROV. BANTEN",
         },
         regency: {
            id: "3674",
            name: "KOTA TANGERANG SELATAN",
         },
         sub_district: {
            id: "367406",
            name: "KEC. PAMULANG",
         },
         village: null,
      },
      {
         type_label: "FASKES",
         id: 429,
         name: "T. Aljumhur Sawah Lama",
         address: "-",
         code: null,
         type: 3,
         status: 1,
         created_at: "2018-06-25T09:07:00.000Z",
         updated_at: "2024-01-16T07:52:13.000Z",
         deleted_at: null,
         province_id: "36",
         regency_id: "3674",
         village_id: null,
         sub_district_id: "367404",
         lat: null,
         lng: "0",
         postal_code: null,
         is_vendor: 0,
         bpom_key: null,
         is_puskesmas: 0,
         rutin_join_date: null,
         is_ayosehat: 0,
         mapping_entity: null,
         entity_tags: [
            {
               id: 13,
               title: "Posyandu",
            },
         ],
         province: {
            id: "36",
            name: "PROV. BANTEN",
         },
         regency: {
            id: "3674",
            name: "KOTA TANGERANG SELATAN",
         },
         sub_district: {
            id: "367404",
            name: "KEC. CIPUTAT",
         },
         village: null,
      },

      // Add more cities as needed
   ];

   const filteredCities = cities.filter((city) =>
      city.name.toLowerCase().includes(query.toLowerCase()),
   );

   return NextResponse.json({ data: filteredCities });
}

export const getEntities = async (keyword) => {
   const res = await fetch('https://api.smile-indonesia.id/entities?' + new URLSearchParams({
      page: 1,
      paginate: 10,
      status: 1,
      keyword,
   }).toString(), {
      headers: new Headers({ 'Authorization': process.env.NEXT_PUBLIC_TOKEN })
   })

   const data = await res.json();
   return data.list;
}