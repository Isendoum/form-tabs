export const getCustomer = async (entityId) => {
   const res = await fetch(`https://api.smile-indonesia.id/entity/${entityId}/customers?` + new URLSearchParams({
      page: 1,
      paginate: 10,
      is_consumption: 1,
   }).toString(), {
      headers: new Headers({ 'Authorization': process.env.NEXT_PUBLIC_TOKEN })
   })

   const data = await res.json();
   return data.list;
}