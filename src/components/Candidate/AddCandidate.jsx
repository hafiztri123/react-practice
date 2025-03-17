import React, { useEffect, useState } from "react";
import _ from 'lodash'
import { api } from "../../service/api";
import { toast } from "react-toastify"


export default function AddCandidate(){
    const [CandidateForm, setCandidateForm] = useState({
        'name': "",
        'email':"",
        'phone':"",
        'skills':"",
        'experience':"",
        'current_position':"",
        'education':"",
        'status':"new"
    })

    const [isError, setIsError] = useState({
        'name': '',
        'email': ''
    })

    const [isLoading, setLoading] = useState(false)

    const successResponse = (message) => {
        toast.success(message, {
            className: "text-xs"
        })
    }

    const failedResponse = (message) => {
        toast.error(message, {
            className: "text-xs"
        })
    }

    useEffect(() => {
        console.log(isError)

    }, [isError])

    const handleAddCandidateSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        api.post('/candidates', CandidateForm)
            .then(function (response) {
                setLoading(false)
                setCandidateForm({
                    'name': "",
                    'email': "",
                    'phone': "",
                    'skills': "",
                    'experience': "",
                    'current_position': "",
                    'education': "",
                    'status': "new"
                })
                setIsError({
                    'name': "",
                    email: ""
                })

                successResponse("Success Adding Candidate")

            })
            .catch(function(error){
                setLoading(false)
                failedResponse("Failed Adding Candidate")
                const errorArray = error.response?.data?.errors 

                const newErrorState = { ...isError };
                Object.keys(isError).forEach((key) => {
                    if (errorArray[key]) {
                        newErrorState[key] = errorArray[key][0];
                    }
                });
                setIsError(newErrorState);
            })
    }

    return(
        
        <div className="w-full overflow-auto p-8 pl-12">
            <div></div>
            <h1 className="text-xl font-semibold mb-8">Add Candidate</h1>
            <div className="flex flex-col">
                <form onSubmit={handleAddCandidateSubmit} className="space-y-4">
                    <div className="flex flex-col space-y-2">
                        <label>Name</label>
                        <input
                            type="text"
                            value={CandidateForm.name}
                            className={`border-2 border-gray-300 rounded-md p-2 w-1/3 bg-white focus:outline-none hover:border-indigo-600 focus:border-indigo-600 ${isError.name ? 'border-red-600' : ''}`}
                            placeholder="Candidate Name"
                            onChange={(e) => setCandidateForm((prev) => ({
                                ...prev,
                                'name': e.target.value
                            }))}
                        />
                        {isError.name && (
                            <span className="text-xs text-red-600">{isError.name}</span>
                        )}
                    </div>
                    <div className="flex flex-col space-y-4">
                        <label>Email</label>
                        <input
                            type="text"
                            value={CandidateForm.email}
                            className={`border-2 border-gray-300 rounded-md p-2 w-1/3 bg-white focus:outline-none hover:border-indigo-600 focus:border-indigo-600 ${isError.email ? 'border-red-600' : ''}`}
                            placeholder="Candidate Email"
                            onChange={(e) => setCandidateForm((prev) => ({
                                ...prev,
                                'email': e.target.value
                            }))}
                        />
                        {isError.email && (
                            <span className="text-xs text-red-600">{isError.email}</span>
                        )}
                    </div>
                    <div className="flex flex-col space-y-4">
                        <label>Phone</label>
                        <input
                            type="text"
                            value={CandidateForm.phone}
                            className="border-2 border-gray-300 rounded-md p-2 w-1/3 bg-white focus:outline-none hover:border-indigo-600 focus:border-indigo-600"
                            placeholder="Candidate Phone"
                            onChange={(e) => setCandidateForm((prev) => ({
                                ...prev,
                                'phone': e.target.value
                            }))}
                        />
                    </div>
                    <div className="flex flex-col space-y-4">
                        <label>Skills</label>
                        <input
                            type="text"
                            value={CandidateForm.skills}
                            className="border-2 border-gray-300 rounded-md p-2 w-1/3 bg-white focus:outline-none hover:border-indigo-600 focus:border-indigo-600"
                            placeholder="Candidate Skills"
                            onChange={(e) => setCandidateForm((prev) => ({
                                ...prev,
                                'skills': e.target.value
                            }))}
                        />
                    </div>
                    <div className="flex flex-col space-y-4">
                        <label>Experience</label>
                        <input
                            type="text"
                            value={CandidateForm.experience}
                            className="border-2 border-gray-300 rounded-md p-2 w-1/3 bg-white focus:outline-none hover:border-indigo-600 focus:border-indigo-600"
                            placeholder="Candidate Experience"
                            onChange={(e) => setCandidateForm((prev) => ({
                                ...prev,
                                'experience': e.target.value
                            }))}
                        />
                    </div>
                    <div className="flex flex-col space-y-4">
                        <label>Current Position</label>
                        <input
                            type="text"
                            value={CandidateForm.current_position}
                            className="border-2 border-gray-300 rounded-md p-2 w-1/3 bg-white focus:outline-none hover:border-indigo-600 focus:border-indigo-600"
                            placeholder="Candidate Current Position"
                            onChange={(e) => setCandidateForm((prev) => ({
                                ...prev,
                                'current_position': e.target.value
                            }))}
                        />
                    </div>
                    <div className="flex flex-col space-y-4">
                        <label>Education</label>
                        <input
                            type="text"
                            value={CandidateForm.education}
                            className="border-2 border-gray-300 rounded-md p-2 w-1/3 bg-white focus:outline-none hover:border-indigo-600 focus:border-indigo-600"
                            placeholder="Candidate Education"
                            onChange={(e) => setCandidateForm((prev) => ({
                                ...prev,
                                'education': e.target.value
                            }))}
                        />
                    </div>
                    <button type="submit" className="border w-1/3 rounded-md p-3 bg-indigo-400 text-white hover:bg-indigo-500 active:bg-indigo-600 mt-4">
                        Add Candidate

                    </button>
                </form>
                
            </div>
        </div>
    )
}

