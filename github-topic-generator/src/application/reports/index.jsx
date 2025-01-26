import React from 'react'
import Titlebar from '../../components/Titlebar';
import ReportTable from './ReportTable';
import { useRecoilValue } from 'recoil';
import { existingTopicsAtom, generatedTopicsAtom } from '../../state/topicsAtom';

const Reports = ({selectedTopics}) => {
  const existingTopics = useRecoilValue(existingTopicsAtom);
  const generatedTopics = useRecoilValue(generatedTopicsAtom);

  const tableData = {
    existingTopics,
    generatedTopics,
    selectedTopics,
  }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
        <Titlebar title={"Summary Report"} />
        <ReportTable data={tableData}/>
      </div>
  )
}

export default Reports