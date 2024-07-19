import React, { useEffect, useState } from 'react';
import { TabPane, Tab, Button, Icon, Input, TextArea, Form, Loader } from 'semantic-ui-react'
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';
import GConf from '../../AssetsM/generalConf';


const CalendarPage = React.lazy(() => import('../../Profile/Calendar/calendarPage'));

const AddToDoCard = ({actionList, openDTwo, setOpenDTwo}) => {
  const { t, i18n } = useTranslation();
  const isRTL = detectRTL.isRtlLang(i18n.language);

  return(<>
      {actionList.map((data,index) => <Button key={index} className='border rounded-pill  mb-2' dir={isRTL ? 'rtl':'ltr'} onClick={() => setOpenDTwo(!openDTwo)}> <Icon name={data.icon} /> {t(`resultPage.actionTextName.${data.tag}.${data.link}`)}   </Button>)}
  </>)
}

function ToDoPage() {
    const [openD, setOpenD] = useState(false)
    const [openDTwo, setOpenDTwo] = useState(false)
    const [todoList, setToDoList] = useState([])
    const [todoItem, setToDoItem] = useState({})
    const [actionList, setActionList] = useState([])
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);
    const [loaderState, setLS] = useState(false)
    const [disabledSaveBtn, setDisabledBtn] = useState(false)

    const panes = [
        {
            menuItem: { key: 'start', icon: 'check', content: ' مهام '   },
          render: () => <ToDoCard />,
        },
        {
            menuItem: { key: 'start', icon: 'calendar alternate outline', content: ' يومية ' },
          render: () => <CalendarPage />,
        },
      ]



    
      useEffect(() => {
        GetAllActionNames()
      }, [])
      
      const GetAllActionNames = () =>  {
          
          let allActionNames = [];
          
          for (let key in GConf.ADIL) {
              if (GConf.ADIL.hasOwnProperty(key)) {
                  let item = GConf.ADIL[key];
                  if (Array.isArray(item.profileBtns) && item.profileBtns.length > 0) {
                      item.profileBtns.forEach(btn => {
                          btn.tag = key;
                      });
                      allActionNames = allActionNames.concat(item.profileBtns);
                  }
              }
          }
          const seenNames = new Set();

          // Filter the array, keeping only the first occurrence of each name
          const uniqueObjects = allActionNames.filter(item => {
              if (seenNames.has(item.name)) {
                  return false; // Duplicate name found, so exclude this item
              } else {
                  seenNames.add(item.name); // Add name to the Set
                  return true; // Include this item
              }
          });
          setActionList(uniqueObjects);
          //return allActionNames;
      }

      const ToDoCard = () =>{
        const EmptyCard = () =>{
            return(<>
            <br />
            <br />
            <br />
            <br />
 
            <h3 className='text-center text-secondary'> صباح الخير &#128525;  , و يومك سعيد  </h3>
            <h5 className='text-center text-secondary'>أنقر لإضافة مهمة للمقائمة ToDo </h5>
            <div className='bi bi-plus bi-lg text-center text-secondary' onClick={() => setOpenD(!openD)} ></div>
            </>)
        }

        const ToDoItem = () =>{
            return(<>
             Ietm
            </>)
        }
        return(<>
        {
            todoList.length == 0 ? <EmptyCard />
            :
            <>
            {
                todoList.map((data,index) => <ToDoItem key={index} data={data} />)
            } 
            </>
        }
        </>)
      }

      const saveFunction = () =>{
          // if (!rendyVousD.comment) {toast.error( t('profilePage.ActionTabData.ActionListeData.docteur.toest.one') , GConf.TostErrorGonf)}
          // else if (!rendyVousD.date) {toast.error(t('profilePage.ActionTabData.ActionListeData.docteur.toest.two') , GConf.TostErrorGonf)}
          // else if (!rendyVousD.time) {toast.error(t('profilePage.ActionTabData.ActionListeData.docteur.toest.three') , GConf.TostErrorGonf)}
          // else{
          //     setLS(true)
          //     axios.post(`${GConf.ApiLink}/Action/docteur-rdv`, {
          //         UID : props.UID,
          //         PID : props.PID ,
          //         TAG : props.TAG ,
          //         rendyVousData : rendyVousD,
          //     }).then(function (response) {
          //         toast.success(<><div><h5>  {t('profilePage.ActionTabData.ActionListeData.docteur.toest.four')}  </h5>  </div></>, GConf.TostInternetGonf)
          //         setLS(false)
          //         setDisabledBtn(true)
          //     }).catch((error) => {
          //         if(error.request) {
          //           toast.error(<><div><h5>  {t('profilePage.ActionTabData.ActionListeData.docteur.toest.five')} </h5> {t('profilePage.ActionTabData.ActionListeData.docteur.toest.one')} </div></>, GConf.TostInternetGonf)
          //           setLS(false)
          //         }
          //     });
          // }
      }

    return ( <>
        <Tab menu={{widths: panes.length , secondary: true, pointing: true }}  panes={panes} />
       
        <BottomSheet expandOnContentDrag open={openD}  onDismiss={() => setOpenD(!openD)}  >
            <div className={`p-4 ${isRTL ? 'text-end':'text-start' } `}>
                <h5 className={`text-secondary ${isRTL ? 'text-end':'text-start' } `} >ماهي المهام التي تريد أضافتها </h5>
                <Input className='mb-3' type='date' fluid alue={todoItem.date}  defaultValue={new Date().toISOString().split('T')[0]} onChange={(e) => setToDoItem({...todoItem, date: e.target.value })}  />
                <Input className='mb-3' type='time' fluid alue={todoItem.time}  defaultValue={new Date().toLocaleTimeString('fr-FR')} onChange={(e) => setToDoItem({...todoItem, time: e.target.value })}  />
                <Button className='border-div bg-white mb-3 border' onClick={() => setOpenDTwo(!openDTwo)}   size='large' fluid  >  أضف مهام   +   </Button>
                <Form className='mb-3'>
                    <TextArea   rows={2} value={todoItem.comment} onChange={ (e,value) => setToDoItem({...todoItem, comment:e.target.value})} />
                </Form>

                <Button className='rounded-pill' onClick={saveFunction} disabled={disabledSaveBtn} size='small' fluid  > <Icon name='save' />  {t('profilePage.ActionTabData.ActionListeData.docteur.saveBtn')}  <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
            </div>
        </BottomSheet>

        <BottomSheet expandOnContentDrag open={openDTwo}  onDismiss={() => setOpenDTwo(!openDTwo)}  >
              <div className={`p-4 ${isRTL ? 'text-end':'text-start' } `}>
                <h5 className={`text-secondary ${isRTL ? 'text-end':'text-start' } `} >ماهي المهام التي تريد أضافتها </h5>
                <AddToDoCard actionList={actionList} openDTwo={openDTwo} setOpenDTwo={setOpenDTwo} />
            </div>
        </BottomSheet>

    </> );
}

export default ToDoPage;