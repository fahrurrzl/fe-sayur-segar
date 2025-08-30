import UnitForm from "@/components/page/admin/dashboard/unit/unit-form";
import unitService from "@/services/unit.service";

const EditUnitPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data } = await unitService.getUnitById(id as string);

  return <UnitForm type="edit" data={data?.data || {}} />;
};

export default EditUnitPage;
