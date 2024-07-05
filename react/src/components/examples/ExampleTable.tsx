import Badge from "@components/ui/Badge";
import Table from "@components/ui/Table";
import useAPI from "@hooks/useAPI";
import useTable from "@hooks/useTable";
import { endpoints } from "@lib/config/global-variable";

const ExampleTable = () => {

    const { data, setData, columns, handleOnChange, setting } = useTable({
        initialColumn: [
            {
                name: "Name",
                key: "name",
                className: "w-[10rem] text-center"
            },
            {
                name: "Title",
                key: "title",
                className: "",
                isSorted: true
            },
            {
                name: "Locate",
                key: "locate",
                className: " text-center",
                isSorted: true
            },
            {
                name: "Status",
                key: "status",
                className: "",
                customeComponent: (data: any) => <Badge label={data.status} />
            },
            {
                name: "Role",
                key: "role",
                className: " text-center",
            },
        ],
        initialData: [],
        initialSetting: {
            sortBy: "",
            sortDir: "",
            checked: true,
            pagination: true
        },
        onFetchData: handleFetchData
    })

    const { apiClient } = useAPI()

    async function handleFetchData(): Promise<any> {
        try {
            const resposne = await apiClient({
                endpoint: endpoints.posts
            })
            console.log("response: ", resposne)
        } catch (error: any) {
            //
        }
    }


    return (
        <div className="p-[5rem]">
            <Table<(typeof data)[0], true>
                setting={setting}
                onChange={handleOnChange}
                columns={columns}
                data={data}
                setData={setData}
            />
        </div>
    )
}



export default ExampleTable