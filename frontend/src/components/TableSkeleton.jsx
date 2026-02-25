function TableSkeleton() {
  return (
    <>
      {[...Array(6)].map((_, i) => (
        <tr key={i} className="border-t">
          <td className="p-4">
            <div className="h-4 w-20 rounded skeleton"></div>
          </td>
          <td className="p-4">
            <div className="h-4 w-32 rounded skeleton"></div>
          </td>
          <td className="p-4">
            <div className="h-4 w-40 rounded skeleton"></div>
          </td>
          <td className="p-4">
            <div className="h-4 w-28 rounded skeleton"></div>
          </td>
          <td className="p-4">
            <div className="h-4 w-6 rounded skeleton"></div>
          </td>
        </tr>
      ))}
    </>
  )
}

export default TableSkeleton