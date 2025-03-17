import React, { useCallback, useEffect, useState } from "react"
import { api } from "../../service/api"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { IoFilterOutline } from "react-icons/io5"
import _ from "lodash"
import ClickAwayListener from "react-click-away-listener"
import { MdDeleteForever } from "react-icons/md"
import { toast } from "react-toastify"

export default function HomePage() {
    const [candidateData, setCandidateData] = useState(null)
    const [candidateDataPage, setCandidateDataPage] = useState(0)
    const [metaDataCandidatePage, setMetaDataCandidatePage] = useState(null)
    const [inputPage, setInputPage] = useState("")
    const [isFilterOpen, setFilterOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusQuery, setStatusQuery] = useState("")
    const [sortBy, setSortBy] = useState("")
    const [sortDirection, setSortDirection] = useState("")
    const [shouldFetchNextPage, setShouldFetchNextPage] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [deletedCandidateID, setDeleteCandidateID] = useState("")

    useEffect(() => {
        if(candidateData && candidateData.length < 5) {
            setShouldFetchNextPage(true)
        } else {
            setShouldFetchNextPage(false)
        }
    }, [candidateData])

    const responseSuccess = (message) => toast.success(message, {
        className: "text-xs",
        autoClose: 250
    })
            
    const responseFailed = (message) => toast.error(message, {
        className: "text-xs"
    })
        



    useEffect(() => {
        let baseSearch = '/search/candidates?'

        if(searchQuery) {
            baseSearch += `search=${searchQuery}&`
        }

        if(statusQuery) {
            baseSearch += `status=${statusQuery}&`
        }

        if(sortBy) {
            baseSearch += `sort_by=${sortBy}&`
        }

        if(sortDirection) {
            baseSearch += `sort_direction=${sortDirection}&`
        }

        baseSearch += `page=${candidateDataPage}`

        console.log(baseSearch)

        api.get(baseSearch)
            .then(function (response){
                setCandidateData(response.data.data)
                setMetaDataCandidatePage(response.data.meta)
                setInputPage("")
            }) 
            .catch(function (error) {
                console.error(error)
            })
    }, [searchQuery, statusQuery, sortBy, sortDirection, candidateDataPage, shouldFetchNextPage])

    const handleCandidateDelete = (id) => {
        setDeleteLoading(true)
        setDeleteCandidateID(id)
        api.delete(`candidates/${id}`)
            .then(function(response){
                responseSuccess('Candidate deleted')
                setCandidateData((prevData) => prevData.filter(candidate=>candidate.id !== id))
                setDeleteCandidateID("")
                setDeleteLoading(false)

            })
            .catch(function(response){
                responseFailed('Failed to delete candidate')
                setDeleteCandidateID("")
                setDeleteLoading(false)

            })
    }



    const debouncedSearch = useCallback(
        _.debounce((query) => {

        }, 300),
        []
    )

    const handleSearchQueryChange = (e) => {
        setSearchQuery(e.target.value)
        debouncedSearch(e.target.value)
    }




    const handleNextPage = () => {
        if (candidateDataPage + 1 <= metaDataCandidatePage?.last_page) {
            setCandidateDataPage(candidateDataPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (candidateDataPage - 1 >= 1) {
            setCandidateDataPage(candidateDataPage - 1);
        }
    };

    const handlePageChange = (e) => {
        if (e.key === 'Enter') {
            const pageNum = parseInt(inputPage)
            if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= metaDataCandidatePage?.last_page){
                setCandidateDataPage(pageNum);
            }
            setInputPage("")
        }
    }

    return (
        <div className="flex flex-col h-full p-8 w-full">
            <Filter 
                isFilterOpen={isFilterOpen} 
                setFilterOpen={setFilterOpen} 
                searchQuery={searchQuery} 
                SearchQueryChange={handleSearchQueryChange}
                statusQuery={statusQuery}
                handleStatusQuery={setStatusQuery}
                sortBy={sortBy}
                handleSortBy={setSortBy}
                sortDirection={sortDirection}
                handleSortDirection={setSortDirection}
            />
            {/* Table container with fixed height and scrolling */}
            <div className="flex-grow overflow-auto min-h-[300px]"> 
                <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_auto] gap-2">
                    {/* Table Headers */}
                    <TableHeader text="Name" />
                    <TableHeader text="Email" />
                    <TableHeader text="Phone" />
                    <TableHeader text="Skills" />
                    <TableHeader text="Experience" />
                    <TableHeader text="Current Position" />
                    <TableHeader text="Education" />
                    <TableHeader text="Status" />
                    <div className="border p-4 bg-gray-600 text-white font-semibold rounded-md shadow-md">
                        Delete
                    </div>


                    {candidateData && candidateData.length > 0 ? (
                        candidateData.map((candidate) => (
                            <React.Fragment key={candidate.id}>
                                <TableCell text={candidate.name} />
                                <TableCell text={candidate.email} />
                                <TableCell text={candidate.phone} />
                                <TableCell text={candidate.skills} />
                                <TableCell text={candidate.experience} />
                                <TableCell text={candidate.current_position} />
                                <TableCell text={candidate.education} />
                                <TableCell text={candidate.status} />
                                <div className={`rounded-md bg-red-400 text-white whitespace-normal break-words p-4 shadow-md w-20 flex items-center justify-center hover:bg-red-500 ${deleteLoading ? "cursor-progress" : "active:bg-red-600" }`} onClick={() => (deletedCandidateID !== candidate.id) && handleCandidateDelete(candidate.id)} >
                                    {deleteLoading && deletedCandidateID === candidate.id  ? (
                                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"/>
                                    ): (
                                            <MdDeleteForever className="w-6 h-6" />
                                    )}

                                </div>
                            </React.Fragment>

                        ))
                    ) : (
                        // Empty state - render at least one row of empty cells to maintain layout
                            <div className="col-span-8 p-4 bg-gray-100 text-gray-500 text-center rounded-md">
                                No data available
                            </div>
                    )}
                </div>
            </div>

            {/* Fixed pagination container */}
            <div className=" h-20 border-t border-gray-200 flex items-center justify-center">
                <div className="flex items-center justify-center space-x-2">
                    <input type="text" 
                            inputMode="numeric"
                            pattern="[0-9]*"
                            placeholder={metaDataCandidatePage?.current_page}
                            value={inputPage}
                            onChange={(e) => setInputPage(e.target.value)}
                            onKeyDown={handlePageChange}
                            className="h-8 w-8 flex items-center justify-center text-center rounded-md bg-gray-300 placeholder-black"
                    
                    />
                    <div className="flex items-center justify-center text-center whitespace-nowrap">
                        of {metaDataCandidatePage?.last_page} pages
                    </div>
                    <div className="flex items-center justify-center w-8 h-8 rounded-md border-gray-300 border-2 hover:bg-gray-300">
                        <button type="button" onClick={() => handlePreviousPage()}>
                            <FaChevronLeft />
                        </button>
                    </div>
                    <div className="flex items-center justify-center w-8 h-8 rounded-md border-gray-300 border-2 hover:bg-gray-300 ">
                        <button type="button" onClick={() => handleNextPage()}>
                            <FaChevronRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function TableHeader({ text }) {
    return (
        <div className="border p-4 bg-indigo-400 text-white font-semibold rounded-md shadow-md">
            {text}
        </div>
    );
}

function TableCell({ text }) {
    return (
        <div className="rounded-md bg-indigo-200 text-gray-800 whitespace-normal break-words pt-4 pl-4 pr-4 pb-5 shadow-md h-16 overflow-auto">
            {text || "-"}
        </div>
    );
}

function Filter({ isFilterOpen, setFilterOpen, searchQuery, SearchQueryChange, statusQuery, handleStatusQuery, sortBy, handleSortBy, sortDirection, handleSortDirection}){
    return (
            <div className="flex items-center justify-end mb-8 relative">
                <input type="text"
                    className="rounded-md p-2 border-gray-300 border-2 focus:outline-none focus:border-indigo-300 f"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={SearchQueryChange}
                />
                <div>
                    <button
                        type="button"
                        onClick={() => setFilterOpen(!isFilterOpen)}
                        className="ml-4 border-2 border-gray-300 p-2 rounded-md bg-indigo-100 hover:bg-indigo-200"
                    >
                        <IoFilterOutline className={`w-5 h-5 transition-transform duration-300 ${!isFilterOpen ? "rotate-180" : ""}`} />

                    </button>
                </div>
                <SearchFilter 
                    isOpen={isFilterOpen}  
                    StatusQuery={statusQuery}
                    handleStatusQuery={handleStatusQuery}
                    sortBy={sortBy}
                    handleSortBy={handleSortBy}
                    sortDirection={sortDirection}
                    handleSortDirection={handleSortDirection}
                />

            </div>
    )
}

function SearchFilter({ isOpen, StatusQuery, handleStatusQuery, sortBy, handleSortBy, sortDirection, handleSortDirection }){
    return (
        <>
        {isOpen ? (
                <div className="absolute border     p-4 w-fit bg-indigo-100 rounded-md top-16">
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center justify-center ">
                            <span className="min-w-[80px] whitespace-nowrap">Status</span>
                            <select 
                                className="border rounded-md p-2 bg-gray-100 w-full"
                                value={StatusQuery}
                                onChange={(e) => handleStatusQuery(e.target.value)}
                                >
                                    <option value="">Select Status</option>
                                    <option value="new">New</option>
                                    <option value="contacted">Contacted</option>
                                    <option value="interviewing">Interviewing</option>
                                    <option value="offered">Offered</option>
                                    <option value="hired">Hired</option>
                                    <option value="rejected">Rejected</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-center w-full ">
                            <span className="min-w-[80px] whitespace-nowrap">Sort By</span>
                            <select
                                className="border rounded-md p-2 bg-gray-100 w-full"
                                value={sortBy}
                                onChange={(e) => handleSortBy(e.target.value)}
                            >
                                <option value="">Select Criteria</option>
                                <option value="name">Name</option>
                                <option value="email">Email</option>
                                <option value="phone">Phone</option>
                                <option value="skills">Skills</option>
                                <option value="experience">Experience</option>
                                <option value="current_position">Current Position</option>
                                <option value="education">Education</option>
                                <option value="status">Status</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-around w-full">
                            <div className="space-x-2 hover:cursor-pointer" onClick={() => handleSortDirection("asc")}>
                                <input 
                                    type="radio"
                                    value="asc"
                                    checked={sortDirection === "asc"}
                                    onChange={() => handleSortDirection("asc")}
                                />
                                <span>Ascending</span>
                            </div>
                            <div className="space-x-2 hover:cursor-pointer" onClick={() => handleSortDirection("desc")}>
                                <input
                                    type="radio"
                                    value="desc"
                                    checked={sortDirection === "desc"}
                                    onChange={() => handleSortDirection("desc")}
                                />
                                <span >Descending</span>

                            </div>
                            

                        </div>
                    </div>
                </div>


        ) : ("")}
        </>
    )
}