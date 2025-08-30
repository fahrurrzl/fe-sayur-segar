"use client";

import DataTable from "@/components/data-table";
import { Button, Tooltip } from "@heroui/react";
import { Key, useCallback, useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { columns } from "./columns";
import { useRouter } from "next/navigation";
import useUnit from "@/hooks/useUnit";
import { useDisclosure } from "@heroui/react";
import ModalDelete from "./modal-delete";

const Unit = () => {
  const [selectedUnit, setSelectedUnit] = useState("");
  const router = useRouter();
  const { dataUnits, isLoadingUnits } = useUnit();

  const { onOpen, onClose, isOpen } = useDisclosure();

  const renderCell = useCallback(
    (unit: Record<string, unknown>, columnKey: Key) => {
      const cellValue = unit[columnKey as string];

      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex items-center justify-center gap-2">
              <Tooltip color="primary" content="Ubah unit">
                <Button
                  isIconOnly
                  variant="light"
                  color="primary"
                  className="text-lg cursor-pointer active:opacity-50"
                  onPress={() =>
                    router.push(`/admin/dashboard/unit/edit/${unit?.id}`)
                  }
                >
                  <FiEdit />
                </Button>
              </Tooltip>
              <Tooltip color="danger" content="Hapus unit">
                <Button
                  isIconOnly
                  variant="light"
                  color="danger"
                  className="text-lg cursor-pointer active:opacity-50"
                  onPress={() => {
                    setSelectedUnit(unit.id as string);
                    onOpen();
                  }}
                >
                  <FiTrash />
                </Button>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <>
      <ModalDelete
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpen}
        selectedUnit={selectedUnit}
        setSelectedUnit={setSelectedUnit}
      />

      <DataTable
        title="Unit"
        description="Kelola unit"
        columns={columns}
        data={dataUnits?.data || []}
        renderCell={renderCell as any}
        addButton
        addButtonText="Tambah Unit"
        onPressAddButton={() => router.push("/admin/dashboard/unit/create")}
        emptyContent="Belum ada unit yang ditambahkan"
        isLoading={isLoadingUnits}
      />
    </>
  );
};

export default Unit;
