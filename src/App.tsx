import { useEffect, useState,useRef} from "react"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/md-light-indigo/theme.css";
// import { DataTableSelectionCellChangeEvent } from "primereact/datatable";
import { OverlayPanel } from 'primereact/overlaypanel';
// import { Button } from 'primereact/button';
import { IoChevronDownOutline } from "react-icons/io5";
// import { FaCircleChevronDown } from "react-icons/fa6";



        

const App = () => {
  const[data,setdata]=useState<any[]>([])
  const[page,setPage]=useState<number>(1)
  const [selectedProducts, setSelectedProducts] = useState<any[]>([])
  const arr:number[]=[1,2,3,4,5]
  const op = useRef<OverlayPanel>(null);
  const [rowInput, setRowInput] = useState<string>("");

  console.log(op)
  const project:()=>Promise<void>=async()=>{
    try {
      
         let pro:any=await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}`)
  let data:any=await pro.json()
  console.log(data.data)
  setdata(data.data)
      
  
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    project()
  },[page])
  return (
    <div className="w-[100%] h-[100vh] flex justify-center mt-[30px]">
      {
        data?(<div className="w-[80%] relative ">
          <DataTable value={data} selection={selectedProducts} onSelectionChange={(e)=>setSelectedProducts(e.value)}>
          <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
          <Column field="artist_id" header="Artist ID" />
            <Column field="title" header="Title" />
            <Column field="place_of_origin" header="origin" />
            <Column field="artist_display" header="artist" />
            <Column field="inscriptions" header="inscription" />
            <Column field="date_start" header="start" />
            <Column field="date_end" header="end" />


    
</DataTable>
 
 <div className="w-full flex justify-center">
  {
    arr?(<div className="flex gap-[10px] my-[20px]">{arr.map((item)=>(
      <button style={page===item?{backgroundColor:"skyblue"}:{}} onClick={()=>setPage(item)}  className="w-[50px] h-[50px] rounded-[50%] border">{item}</button>
    ))}</div>):null
  }
 </div>
 <div className="absolute top-[25px] left-[110px] scale-[1.5]">
 <IoChevronDownOutline className="border-none bg-none" type="button"   onClick={(e) => op.current && op.current.toggle(e)} />
            <OverlayPanel  ref={op}>
                <input
                className="border "
                  type="text"
                  placeholder="Select rows...."
                  value={rowInput}
                  onChange={e => setRowInput(e.target.value)}
                />
                <button
                  onClick={() => {
                    const n = parseInt(rowInput);
                    if ( n > 0) {
                      setSelectedProducts(data.slice(0, n));
                    }
                  }}
                >
                  Select the row
                </button>
            </OverlayPanel>

 </div>

        </div>
        
      ):(<h1>Loading....</h1>)
      }

    </div>
  )
}

export default App