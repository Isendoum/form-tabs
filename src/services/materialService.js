export const getMaterial = async (params) => {
   const res = await fetch(
      "https://api.smile-indonesia.id/v2/stocks?" +
         new URLSearchParams({
            page: 1,
            paginate: 1000,
            entity_id: params.entity_id,
            activity_id: params.activity_id,
         }).toString(),
      {
         headers: new Headers({ Authorization: process.env.NEXT_PUBLIC_TOKEN }),
      },
   );

   const data = await res.json();
   return data.list;
};
