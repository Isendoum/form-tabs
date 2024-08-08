const List = ({ data, handleSelectedRow }) => {
   return (
      <div>
         <div className="grid grid-cols-2 bg-gray-100 p-2 font-bold">
            <div>Name</div>
            <div>Available Stock</div>
         </div>
         <div className="grid grid-cols-1 divide-y divide-gray-300">
            {data &&
               data?.map((obj, index) => (
                  <div
                     key={index}
                     className="p-2 grid grid-cols-2"
                     onClick={handleSelectedRow}
                  >
                     <div>{obj.materialName}</div>
                     <div>{obj.availableStock}</div>
                  </div>
               ))}
         </div>
      </div>
   );
};

export default List;
