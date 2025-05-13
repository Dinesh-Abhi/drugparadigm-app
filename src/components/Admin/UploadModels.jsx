import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {CreateModels} from '../../redux/models/actionCreator';

const UploadModels = () => {
const dispatch = useDispatch()
const { CreateModelsResData, creatingModelsLoading } = useSelector((state) => {
  return {
    CreateModelsResData: state.CreateModelsReducerRes.data,
    creatingModelsLoading: state.CreateModelsReducerRes.loading,
  };
}


);

  return (
    <div>UploadModels</div>
  )
}

export default UploadModels