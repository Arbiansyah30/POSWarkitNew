import { useIncome } from "@hooks/admin/useIncome";
import { useSearchParams } from "react-router-dom";
import { convertQueryParamsToObject } from "../../../libs/helper";
import Pagination from "../../global/Pagination";
import { Table, TableBody, TableHead } from "../../global/Table";
import { TableItem } from "./Table";

export const IncomeContent = () => {
  const { data: income } = useIncome();

  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = convertQueryParamsToObject(searchParams.toString());
  const handleChangePage = (page: number) => {
    setSearchParams({ ...queryParams, page: String(page) });
  };

  console.log(income?.data?.incomes);

  return (
    <>
      <div className="rounded-md border border-stroke w-full bg-gray-900 px-5 shadow-default dark:bg-boxdark sm:px-7">
        <div className="py-6  flex flex-wrap items-center justify-between">
          <h4 className="text-xl font-bold text-white">Data Transaction</h4>
        </div>
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHead HeadList={["Name", "Total Amount", "Created At", ""]} />
            <TableBody>
              <>
                {income?.data?.incomes?.map((item, index) => (
                  <TableItem
                    key={index}
                    name={item.transaction?.name as string}
                    nominal={item.nominal}
                    createdAt={item.createdAt}
                  />
                ))}
              </>
            </TableBody>
          </Table>
        </div>
      </div>
      <Pagination
        currentPage={income?.meta?.page as number}
        totalPages={income?.meta?.totalPages as number}
        onPageChange={handleChangePage}
      />
    </>
  );
};
