import React, { useState, useEffect  } from 'react';
import getPositions from '../../services/getPositions';
import PositionsFilters from './positions-filters';
import { getPositionPrecentagesInput} from '../inputs/filters-inputs-mockup';
import getDepartments from '../inputs/filters-inputs-mockup';
import PositionsCards from './position-cards';
import Preview from './preview';
import pagination from '../../utilities/paginate';
import filter from '../../utilities/filter';
import Pagination from '../general/pagination';
import SearchPosition from './search-position';
import search from '../../utilities/search';
import getStages from './../../pages/home-page-mockups/stages-mockup';
import getPositionsPage from '../../services/positions-page';


const PositionsDashboard = ({handleSave, savedPositions, translation, searchDepartment, searchPositionPrecentage, searchString, id}) => {
    const [positions, positionsChange]= useState([]);
    const [searchTerm, searchTermChange]= useState("");
    const [filterInputs, filterInputsChange]= useState([]);
    const [activeFilters, activeFiltersChange]= useState([]);
    const [currentPosition, currentPositionChange]= useState({});
    const [pageSize, pageSizeChange]= useState(7);
    const [currentPage, currentPageChange]= useState(1);
    const [positionStages, positionStagesChange]= useState([]);
    const [searchedData, changeSearchedData] = useState([]);
    const [filteredData, changeFilteredData] = useState([]);
    const [data, changeData] = useState([]);
    const [positionsPageData, changePositionspageData] = useState({})
    let filters = [getDepartments(), getPositionPrecentagesInput()];


    useEffect (() => {
        getPositionsPage(changePositionspageData)
        positionStagesChange(getStages());
    }, []);


    useEffect(()=> {
        changeSearchedData(search(searchTerm, positions));
    }, [searchTerm, positions, activeFilters])

    useEffect (()=> {
        if(id) handleOpenLinkPosition(id, filteredData)
    },[filteredData])

    useEffect(()=> {
        changeFilteredData(filter(activeFilters, searchedData));
    },[searchedData, activeFilters])

    useEffect(()=> {
        changeData(pagination(filteredData, currentPage, pageSize))
    },[filteredData, currentPage, activeFilters])



    useEffect(()=> {
        if(positionsPageData.payload){
            filters[0].options = positionsPageData.payload.domains;
            filters[1].options = positionsPageData.payload.positionPercentage;
            filters.forEach(filter => filter.options.forEach(option => option.checked = false))
            filterInputsChange(filters);
            if(searchString) handleSearch(searchString);
            if(searchDepartment.length > 0) handleURLFilter("department", searchDepartment, filters);
            if(searchPositionPrecentage.length > 0) handleURLFilter("positionPrecentage", searchPositionPrecentage, filters);
            positionsChange(positionsPageData.payload.positions)
        } 
    },
    [positionsPageData])

    useEffect(()=> {
        if(positionsPageData.payload){
        var currentFilters = JSON.parse(JSON.stringify(filterInputs));
        let noFilters = false;
        currentFilters.forEach(f => {
            f.options = f.options.filter(o => o.checked);
            if(f.options.length > 0){
                noFilters = true;
            }
        });
        if(noFilters) {
            activeFiltersChange([...currentFilters])
        }
        else {
            activeFiltersChange([]) 
        }
        }
    },
    [filterInputs])

    const handleInputChange = (e, input, option) => {
        e.preventDefault();
        let localInputs = filterInputs;
        if(input.type === "radio"){
            let inputIndex = localInputs.map(e => e.field).indexOf(input.field);
            let localInput = localInputs[inputIndex];
            localInput.options.forEach(o => o.checked = false);
            let optionIndex = localInput.options.map(e => e.id).indexOf(option.id);
            localInputs[inputIndex].options[optionIndex].checked = true;
            filterInputsChange([...localInputs]);
        }
        else {
            let inputIndex = localInputs.map(e => e.field).indexOf(input.field);
            let localInput = localInputs[inputIndex];
            let optionIndex = localInput.options.map(e => e.id).indexOf(option.id);
            localInputs[inputIndex].options[optionIndex].checked = !option.checked;
            filterInputsChange([...localInputs]);
        }
        currentPageChange(1)
    }
    
    const handleURLFilter = (field, values, filters) => {
        let pageFilters = filters;
        let input = Object.assign({}, pageFilters.find(x => x.field === field));
        values.forEach(value => {
            let optionIndex = input.options.map(e => e.id).indexOf(value);
            if(optionIndex >= 0) {
                input.options[optionIndex].checked = true
            }
        })
        filterInputsChange(pageFilters)
    }

    const handleRemoveAllFilters = () => {
        activeFiltersChange([]);
        filterInputs.forEach(f => f.options.forEach(o=> o.checked = false));
    }
    
    const handlePreview = position => {
        position.id? 
        currentPositionChange(currentPosition => ({
            ...currentPosition,
            ...position
        }))
        :
        currentPositionChange({});
        window.scrollTo({
            top: 200,
            behavior: 'smooth',
          })
    }

    const handleRemoveFilter = (input, option) => {
        let currentFilters = activeFilters;
        let inputIndex = currentFilters.indexOf(input);
        let optionIndex = currentFilters[inputIndex].options.indexOf(option);
        currentFilters[inputIndex].options.splice(optionIndex, 1)
        if(currentFilters[inputIndex].options.length === 0){
            currentFilters.splice(inputIndex, 1)
        }
        activeFiltersChange([...currentFilters])
    }

    const handlePageChange = (event, page) => {
        if (event.key === "Enter" && event._reactName === "onKeyDown" || event._reactName === "onClick") {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            currentPageChange(page);  
        } 
    }

    const handleSearch = (value) => {
        searchTermChange(value)
    }

    const handlePositionNavigation = position => {
        position.id? 
        currentPositionChange(currentPosition => ({
            ...currentPosition,
            ...position
        }))
        :
        currentPositionChange({});
    }

    const handleOpenLinkPosition = (id, data) => {
        let position = data.filter(x => x.id === id)[0];
        currentPositionChange(currentPosition => ({
            ...currentPosition,
            ...position
        }))
    }


        
        return (<React.Fragment>
                <SearchPosition searching={handleSearch} searchTerm={searchTerm} translation={translation}></SearchPosition>
                <div className='positions-dashboard'>
                    <h2>{filteredData && filteredData.length} {translation.data.POSITIONS_PAGE.OPEN_POSITIONS}</h2>
                    {currentPage.title}
                        <PositionsFilters activeFilters={activeFilters} filterInputs={filterInputs} handleInputChange={handleInputChange} removeAllFilters={handleRemoveAllFilters} removeFilter={handleRemoveFilter} positionNavigation={handlePositionNavigation} currentPosition={currentPosition} translation={translation}></PositionsFilters>
                        {filteredData.length > 0 ?
                            <div className={currentPosition.id? "positions-section preview":"positions-section"}>
                                
                                <PositionsCards positions={data} filteredData={filteredData} currentPosition={currentPosition} preview={handlePreview} handleSave={handleSave} savedPositions={savedPositions}></PositionsCards>
                                <Preview currentPosition={currentPosition} filteredData={filteredData} positionNavigation={handlePositionNavigation} handleSave={handleSave} savedPositions={savedPositions} positionStages={positionStages}></Preview>
                                <Pagination 
                                    itemsCount={filteredData.length}
                                    pageSize={pageSize} 
                                    onPageChange={handlePageChange} 
                                    currentPage={currentPage}
                                    translation={translation}
                                />
                            </div>
                            
                        :
                        <div className='no-results'>
                            <h3>
                            מצטערים, מיטב כוחותינו לא מצאו את מה שחיפשתם 
                            </h3>
                            <h4>
                                טיפים לחיפוש:
                            </h4>
                            <p>
                                בדקו אם יש טעויות איות<br/>
                                נסו לחפש מונח כללי יותר<br/>
                                הגבילו את תיבת הבחירה המרובה לבחירה אחת או שתיים 
                                 או לחצו 
                                <a href="/application">
                                    להגשת מועמדות כללית
                                </a>
                            </p>
                            
                        </div>
                        }
                    
               </div>
            </React.Fragment>)
    
}
 
export default PositionsDashboard;