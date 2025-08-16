import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Card,
  CardBody,
  CardHeader,
  Button,
  Skeleton,
} from "@heroui/react";
import React, { Key, ReactNode } from "react";
import { FiPlus } from "react-icons/fi";

interface PropTypes {
  columns: Record<string, unknown>[];
  data: Record<string, unknown>[];
  renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
  title?: string;
  description?: string;
  addButton?: boolean;
  addButtonText?: string;
  onPressAddButton?: () => void;
  emptyContent?: string;
  isLoading?: boolean;
}

const DataTable = ({
  columns,
  data,
  renderCell,
  title = "Data Table",
  description = "Description of data table",
  addButton = false,
  addButtonText = "Tambah",
  onPressAddButton,
  emptyContent,
  isLoading,
}: PropTypes) => {
  return (
    <div>
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-xs text-gray-500">{description}</p>
          </div>
          {addButton && (
            <Button
              color="success"
              onPress={onPressAddButton}
              className="flex items-center gap-2 text-white"
            >
              <FiPlus />
              {addButtonText}
            </Button>
          )}
        </CardHeader>
        <CardBody>
          <Skeleton className="min-h-[250px] rounded-lg" isLoaded={!isLoading}>
            <Table aria-label="Example table with custom cells">
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn
                    key={column.uid as Key}
                    align={column.uid === "actions" ? "center" : "start"}
                  >
                    {`${column.name}`}
                  </TableColumn>
                )}
              </TableHeader>
              {data.length > 0 ? (
                <TableBody items={data}>
                  {(item) => (
                    <TableRow key={item.id as Key}>
                      {(columnKey) => (
                        <TableCell>
                          {renderCell(item, columnKey as Key)}
                        </TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              ) : (
                <TableBody emptyContent={emptyContent}>{[]}</TableBody>
              )}
            </Table>
          </Skeleton>
        </CardBody>
      </Card>
    </div>
  );
};

export default DataTable;
