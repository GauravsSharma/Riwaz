import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  flexRender,
  ColumnDef,
  Row
} from '@tanstack/react-table';
import { ChevronDown, ChevronRight, Plus, MoreVertical, Edit, Trash2 } from 'lucide-react';
import AddBaseProductModel from '../models/AddBaseProductModel';
import DeleteProductDialog from '../models/DeleteProduct';
import AddProductModal from '../models/AddProductModel';
import ProductImageDialog from '../models/AddImages';


type TableRow = BaseProduct | (SellerProduct & { isParent?: false; parentId: string });

const SareeProductTable = ({
  data
}: {
  data: BaseProduct[]
}) => {
  console.log(data, "from table");

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<SellerProduct>();
  const [selectedBaseProductId, setSelectedBaseProductId] = useState<string>();
  const [showAddBaseProductDialog, setShowAddBaseProductDialog] = useState(false);
  const [showAddVariantModel, setShowAddVariantModel] = useState(false);
  const [showAddImagesModel, setShowAddImagesModel] = useState(false);
  const [createdProductId, setCreatedProductId] = useState<string>()
  // pagination (pageIndex is 0-based)
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize] = useState(2); // show 2 parent products per page

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));

  const paginatedData = useMemo(() => {
    const start = pageIndex * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, pageIndex, pageSize]);

  const toggleMenu = (variantId: string) => {
    setOpenMenuId(openMenuId === variantId ? null : variantId);
  };

  const handleEdit = (variantId: string) => {
    console.log('Edit variant:', variantId);
    setOpenMenuId(null);
  };

  const handleDelete = (variant: SellerProduct) => {
    setSelectedProduct(variant)
    setIsDeleteModelOpen(true)
    setOpenMenuId(null);
  };

  const handleAddVariant = (parentId: string) => {
    console.log('Add variant to parent:', parentId);
    setSelectedBaseProductId(parentId)
    setShowAddVariantModel(true);
  };

  const getStatusColor = (status: boolean) => {
    if (status) {
      return 'bg-green-100 text-green-800';
    }
    return 'bg-red-100 text-red-800';
  };

  const columns = useMemo<ColumnDef<TableRow>[]>(
    () => [
      {
        id: 'expander',
        header: () => null,
        cell: ({ row }) => {
          if (row.original.isParent) {
            return (
              <button
                onClick={row.getToggleExpandedHandler()}
                className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
              >
                {row.getIsExpanded() ? (
                  <ChevronDown size={18} />
                ) : (
                  <ChevronRight size={18} />
                )}
              </button>
            );
          }
          return null;
        }
      },
      {
        accessorKey: 'name',
        header: 'Product',
        cell: ({ row }) => {
          const item = row.original;
          if (item.isParent) {
            return (
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 bg-purple-600 text-white text-xs rounded font-semibold uppercase">
                  Parent
                </span>
                <span className="font-bold text-gray-900">{item.title}</span>
              </div>
            );
          } else {
            const variant = item as SellerProduct & { parentId: string };
            return (
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-sm">└─</span>
                <img
                  src={variant.thumbnail?.url || "https://sudathi.com/cdn/shop/files/4292S921_4.jpg?v=1756404457&width=750"}
                  alt={variant.title}
                  className="w-12 h-12 rounded object-cover border border-gray-200"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {variant.title}
                  </p>
                  {/* <p className="text-xs text-gray-500 mt-0.5">
                    {variant.color}
                  </p> */}
                </div>
              </div>
            );
          }
        }
      },
      {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => {
          const item = row.original;
          if (item.isParent) {
            return <span className="text-sm text-gray-600">—</span>;
          }
          const variant = item as SellerProduct;
          return (
            <span className="text-sm font-semibold text-gray-900">
              ₹{variant.price.toLocaleString()}
            </span>
          );
        }
      },
      {
        accessorKey: 'stock',
        header: 'Stock',
        cell: ({ row }) => {
          const item = row.original;
          if (item.isParent) {
            return <span className="text-sm text-gray-600">—</span>;
          }
          const variant = item as SellerProduct;
          return <span className="text-sm text-gray-900">{variant.stock}</span>;
        }
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const item = row.original;
          if (item.isParent) {
            const parent = item as BaseProduct;
            return (
              <span className="text-sm text-gray-600 font-medium">
                {parent.varients.length} {parent.varients.length === 1 ? 'variant' : 'varients'}
              </span>
            );
          }
          const variant = item as SellerProduct;
          return (
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                variant.isActive
              )}`}
            >
              {variant.isActive ? "Active" : "In Active"}
            </span>
          );
        }
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
          const item = row.original;
          if (item.isParent) {
            return (
              <button
                onClick={() => handleAddVariant(item._id)}
                className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors cursor-pointer"
              >
                <Plus size={16} />
                Add Variant
              </button>
            );
          }
          const variant = item as SellerProduct & { parentId: string };
          return (
            <div className="relative">
              <button
                onClick={() => toggleMenu(variant._id)}
                className="p-1 rounded hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <MoreVertical size={18} className="text-gray-600" />
              </button>

              {openMenuId === variant._id && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setOpenMenuId(null)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                    <button
                      onClick={() => handleEdit(variant._id)}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <Edit size={16} />
                      Edit Product
                    </button>
                    <button
                      onClick={() => handleDelete(variant)}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <Trash2 size={16} />
                      Delete Product
                    </button>
                  </div>
                </>
              )}
            </div>
          )
        }
      }
    ],
    [openMenuId]
  );

  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: (row) => {
      if (row.isParent) {
        return row.varients.map(v => ({ ...v, parentId: row._id }));
      }
      return undefined;
    },
    initialState: {
      expanded: {
        0: true,
        1: true,
        2: true
      }
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Product Management (Parent-Child Model)</h1>
          <button
            onClick={() => setShowAddBaseProductDialog(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium cursor-pointer"
          >
            <Plus size={18} />
            Add Base Product
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${header.id === 'expander' ? 'w-12' : ''
                          }`}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map((row) => {
                  const isParent = row.original.isParent;
                  return (
                    <tr
                      key={row.id}
                      className={`${isParent
                        ? 'bg-purple-50 hover:bg-purple-100'
                        : 'hover:bg-gray-50'
                        } transition-colors`}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-6 py-4">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* pagination controls */}
            <div className=" mt-4 p-5">
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
                  disabled={pageIndex === 0}
                  className={`px-3 py-1 rounded ${pageIndex === 0 ? 'bg-gray-200 cursor-not-allowed' : 'bg-purple-600 text-white'} cursor-pointer`}
                >
                  Previous
                </button>

                <button
                  onClick={() => setPageIndex((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={pageIndex >= totalPages - 1}
                  className={`px-3 py-1 rounded ${pageIndex >= totalPages - 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-purple-600 text-white'} cursor-pointer`}
                >
                  Next
                </button>
              </div>

              <div className="text-sm mt-4 text-center text-gray-700">
                Page {pageIndex + 1} of {totalPages}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Add Base Product Dialog */}
      {showAddBaseProductDialog && (
        <AddBaseProductModel setShowAddBaseProductDialog={setShowAddBaseProductDialog} />
      )}
      {selectedProduct && isDeleteModelOpen && <DeleteProductDialog isOpen={isDeleteModelOpen} setIsOpen={setIsDeleteModelOpen} productId={selectedProduct._id} productName={selectedProduct?.title} />}
      {
        selectedBaseProductId && showAddVariantModel && <AddProductModal isOpen={showAddVariantModel} setIsOpen={setShowAddVariantModel} setCreatedProductId={setCreatedProductId} parentId={selectedBaseProductId} setImageOpenModel={setShowAddImagesModel} />
      }
      {
        createdProductId && showAddImagesModel && <ProductImageDialog isOpen={showAddImagesModel} setIsOpen={setShowAddImagesModel} productId={createdProductId} />
      }
    </div>
  );
};

export default SareeProductTable;