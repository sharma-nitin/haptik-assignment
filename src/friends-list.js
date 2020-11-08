import { useState } from 'react'
import './friends-list.css'
import Modal from "react-modal";
import Pagination from "react-js-pagination"
Modal.setAppElement("#root");

export const Friendslist = () => {

    var list = [{ name: 'Rahul Gupta', isFavourite: true },
    { name: 'Shivangi sharma', isFavourite: false },
    { name: 'Akash Singh', isFavourite: false },
    { name: 'Ayush', isFavourite: false },
    { name: 'Stephen', isFavourite: false }]

    const [friendlist, setfriendlist] = useState(list);
    const [friends, setsearchedFriends] = useState(list);
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState(''); 
    const [deletecontact, setDeletecontact] = useState('');
    const [newfriend, setnewfriend] = useState('');
    const [errorinAddFriend, seterrorinAddFriend]= useState('');
    const [successinAddFriend, setsuccessinAddFriend]= useState('');
    const [currentPage,setcurrentPage]= useState(1);
    const [currentPageData,setcurrentPageData]= useState(friends.slice(0,4));

    function toggleModal(friend) {
        setDeletecontact(friend.name);
        setIsOpen(!isOpen);
    }

    function deleteContact(){
        const updatedData = friendlist.filter(function (friend) {
            return friend.name !== deletecontact
        })
        setsearchedFriends([...updatedData])
        setfriendlist([...updatedData])
        setcurrentPage(1)
        setcurrentPageData(updatedData.slice(0,4))
        setIsOpen(!isOpen);
    }

    const updateSearch = (event) => {
        setSearch(event.target.value);
        const searchedData = friendlist.filter(function (friend) {
            return friend.name.toLowerCase().startsWith(event.target.value.trim().toLowerCase())
        })
        setsearchedFriends([...searchedData]);
        setcurrentPage(1);
        setcurrentPageData(searchedData.slice(0,4))
    }

    function updateFavourite(friend) {
        if (!friend.isFavourite) {
           let restData = friends.filter(function(item) {
                return item.name !== friend.name
            })
           let updateRecord = {
                name:friend.name,
                isFavourite:true
            }
            restData.unshift(updateRecord)  // Add newly favourite to top of array
            setsearchedFriends([...restData]);
            setfriendlist([...restData])
            setcurrentPage(1);
            setcurrentPageData(restData.slice(0,4))
        } else {

            let restData = friends.filter(function(item) {
                return item.name !== friend.name
            })
           let updateRecord = {
                name:friend.name,
                isFavourite:false
            }
            restData.push(updateRecord)  // Add removed favourite to end of array
            setsearchedFriends([...restData]);
            setfriendlist([...restData])
            setcurrentPage(1);
            setcurrentPageData(restData.slice(0,4))
        }
    }

    function addNewFriend(event){
        setsuccessinAddFriend('');
        if(event.key ==='Enter'){
          if(newfriend.trim().length >0){
              const new_friend = {
                  name:newfriend,
                  isFavourite:false
              }
              const existingcontacts = friends;
              for(let i=0;i<existingcontacts.length;i++){
                  if(existingcontacts[i].name.toLowerCase() === newfriend.toLowerCase()){
                    seterrorinAddFriend('Friend with provided name already exist.');
                    return;
                  }
              }
              existingcontacts.push(new_friend);
              setsearchedFriends([...existingcontacts]);
              setfriendlist([...existingcontacts])
              setsuccessinAddFriend('Friend Added successfully')
              
          } else {
            seterrorinAddFriend("Friend's name cannot be empty")
          }
        }
    }

   function handlePageChange(pageNumber) {
        let upperLimit = parseInt(pageNumber)*4;
        let lowerLimit = upperLimit - 4;
       
        if(upperLimit <= friends.length){
            setcurrentPage(pageNumber);
            setcurrentPageData(friends.slice(lowerLimit,upperLimit))
                
        }else{
            setcurrentPage(pageNumber);
            setcurrentPageData(friends.slice(lowerLimit))
        }
      }

    return (
        <div className="application">
              <div className="add-friend">
              <h3 className="header">Add New Friend</h3>
              <input className="searchbox" type="text" placeholder="Enter friend's name to add"
                onChange={e =>{setnewfriend(e.target.value);seterrorinAddFriend('') } } onKeyPress={(e)=>addNewFriend(e)}>
              </input>
               {errorinAddFriend ? <sub className="add-friend-error">{errorinAddFriend}</sub> : null}
               {successinAddFriend ? <sub className="add-friend-success">{successinAddFriend}</sub> : null}
              </div>

            <div className="friend-list">
            <h3 className="header">Friends List</h3>
            <input className="searchbox" type="text" placeholder="Enter your friends name" value={search} onChange={updateSearch}>
            </input>
            <Modal
                isOpen={isOpen}
                onRequestClose={toggleModal}
                contentLabel="Are you sure you want to delete the friend from list"
                className="mymodal"
                overlayClassName="myoverlay"
            >
                <div>Are you sure you want to delete {deletecontact}  from your friends list</div>
                <div className="flex-basis">
                <button className="Modal-button" onClick={deleteContact}>Yes</button>
                <button className="Modal-button" onClick={toggleModal}>No</button>
                </div>
            </Modal>
            <ul className="flist-container">
                {
                    currentPageData.map((friend) => {
                        return (
                            <li className="list-item">
                                <div className="flex">
                                    <div>
                                        <p className="fname">{friend.name}</p>
                                        <sub className="sub-heading">is your friend</sub>
                                    </div>

                                    <div>
                                        <span onClick={() => updateFavourite(friend)} className={"icon " + (friend.isFavourite ? 'favourite' : '')} >
                                            <i class="fa fa-heart"></i>
                                        </span>

                                        <span onClick={()=>toggleModal(friend)} className="icon">
                                            <i class="fa fa-trash"></i>
                                        </span>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
                {
                    (friends.length === 0 ? <sub className="sub-heading">No Friend found</sub> : null)

                }
            </ul>
                <div className="pagination-box">
                    <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={4}
                    totalItemsCount={friends.length}
                    pageRangeDisplayed={4}
                    itemClass="pagination-list"
                    activeClass = "pagination-active"
                    onChange={handlePageChange}
                    />
                </div>
            </div>


        </div>
    )
}