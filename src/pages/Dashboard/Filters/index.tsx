interface FilterProps {
  handleOnSelect: any;
  data: string[];
  filter_name: string;
}

const Filter = ({ handleOnSelect, data, filter_name }: FilterProps) => {
  return (
    <select
      name="  Type"
      className="bg-gray-50 border accent-black border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary/10 accent-blacks focus:border-primary block w-full p-2.5 "
      defaultValue={"DEFAULT"}
      onChange={handleOnSelect}
    >
      <option value="DEFAULT" disabled>
        {filter_name}
      </option>
      <option value="">All</option>
      {data?.map((t: string) => {
        return (
          <option key={t} value={t}>
            {t}
          </option>
        );
      })}
    </select>
  );
};

//Filters data

export const status_data: string[] = ["Active", "Suspended"];
export const subscriptions_status_data: string[] = ["Active", "Unsubscribed"];
export const role_data: string[] = ["partner", "admin", "normal"];
export const notifications_data: string[] = ["Admin"];

export default Filter;
