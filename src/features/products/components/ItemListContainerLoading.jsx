import ItemList from './ItemList'

const ItemListContainerLoading = () => {

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div role="status" class="max-w-sm animate-pulse mt-4">
        <div class="h-6 bg-gray-200 rounded-full w-48 mb-4"></div>
        <div class="h-3 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
        <div class="h-3 bg-gray-200 rounded-full max-w-[330px]"></div>
        <span class="sr-only">Cargando...</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {[1, 2, 3].map((item) => (
          <div key={item} className="animate-pulse rounded-lg p-4">
            <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded-full w-3/4 mb-3"></div>
            <div className="h-3 bg-gray-200 rounded-full w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded-full w-1/4 mb-4"></div>
            <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default ItemListContainerLoading;
