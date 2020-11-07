
import { useState } from 'react'
import './friends-list.css'
import Modal from "react-modal";

Modal.setAppElement("#root");

export const Friendslist = () => {

    let list = [{ name: 'Rahul Gupta', isFavourite: true },
    { name: 'Shivangi sharma', isFavourite: false },
    { name: 'Akash Singh', isFavourite: false }]

    const [friends, setsearchedFriends] = useState(list);
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState(''); 
    const [deletecontact, setDeletecontact] = useState('');
    const [newfriend, setnewfriend] = useState('');

    function toggleModal(friend) {
        setDeletecontact(friend.name);
        setIsOpen(!isOpen);
    }

    function deleteContact(){
        const updatedData = friends.filter(function (friend) {
            return friend.name !== deletecontact
        })
        setsearchedFriends([...updatedData])
        setIsOpen(!isOpen);
    }

    const updateSearch = (event) => {
        setSearch(event.target.value);
        const searchedData = list.filter(function (friend) {
            return friend.name.toLowerCase().startsWith(event.target.value.toLowerCase())
        })
        setsearchedFriends([...searchedData]);
    }

    function addtoFavourite(friend) {
        if (!friend.isFavourite) {
            const updatedData = friends.map(function (item) {
                if (friend.name === item.name) {
                    return {
                        name: item.name,
                        isFavourite: true
                    }
                } else {
                    return {
                        name: item.name,
                        isFavourite: item.isFavourite
                    }
                }
            })
            setsearchedFriends([...updatedData]);
        } else {
            return;
        }
    }

    function addNewFriend(event){
        if(event.key ==='Enter'){
          if(newfriend.length >0){
              const new_friend = {
                  name:newfriend,
                  isfavourite:false
              }
              const existingcontacts = friends;
              existingcontacts.push(new_friend);
              setsearchedFriends([...existingcontacts]);
              setnewfriend('');
          } else {
              return;
          }
        }
    }

    return (
        <div className="application">
              <div className="add-friend">
              <h3 className="header">Add New Friend</h3>
              <input className="searchbox" type="text" placeholder="Enter friend's name to add"
                onChange={e => setnewfriend(e.target.value)} onKeyPress={(e)=>addNewFriend(e)}>
              </input>
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
                    friends.map((friend) => {
                        return (
                            <li className="list-item">
                                <div className="flex">
                                    <div>
                                        <p className="fname">{friend.name}</p>
                                        <sub className="sub-heading">is your friend</sub>
                                    </div>

                                    <div>
                                        <span onClick={() => addtoFavourite(friend)} className={"icon " + (friend.isFavourite ? 'favourite' : '')} >
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
            </div>
        </div>

    )

}