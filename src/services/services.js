export const getActivity = async () => {
   const res = await fetch(
      "https://api.smile-indonesia.id/v2/master-activities",
      {
         headers: new Headers({ Authorization: process.env.NEXT_PUBLIC_TOKEN }),
      },
   );

   const data = await res.json();
   return data.list;
};

export const getCustomer = async (entityId) => {
   const res = await fetch(
      `https://api.smile-indonesia.id/entity/${entityId}/customers?` +
         new URLSearchParams({
            page: 1,
            paginate: 10,
            is_consumption: 1,
         }).toString(),
      {
         headers: new Headers({ Authorization: process.env.NEXT_PUBLIC_TOKEN }),
      },
   );

   const data = await res.json();
   return data.list;
};

export const getEntities = async (keyword) => {
   const res = await fetch(
      "https://api.smile-indonesia.id/entities?" +
         new URLSearchParams({
            page: 1,
            paginate: 10,
            status: 1,
            keyword,
         }).toString(),
      {
         headers: new Headers({ Authorization: process.env.NEXT_PUBLIC_TOKEN }),
      },
   );

   const data = await res.json();
   return data.list;
};

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

export const getTransactionType = async () => {
   const res = await fetch("https://api.smile-indonesia.id/transaction-types", {
      headers: new Headers({ Authorization: process.env.NEXT_PUBLIC_TOKEN }),
   });

   const data = await res.json();
   return data.list;
};
