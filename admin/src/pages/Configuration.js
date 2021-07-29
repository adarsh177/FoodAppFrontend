import React, { useEffect, useState } from "react";
import { AddAdmin, AddIngredient, AddTag, DeleteAdmin, DeleteIngredient, DeleteTag, GetAdmins, GetCommision, GetIngredients, GetTags, UpdateCommision } from "../APIs/AdminManager";
import {
   Navigation,
   MobileNavigationTop,
   MobileNavigationBottom,
} from "../components/navigation/navigation";
import "./css/Configuration.css";

const Configuration = () => {
   const [ingredients, setIngredients] = useState([])
   const [tags, setTags] = useState([])
   const [admins, setAdmins] = useState([])
   const [commision, setCommision] = useState(0)
   const [ingredientInput, setIngredientInput] = useState("");
   const [tagInput, setTagInput] = useState("")
   const [adminInput, setAdminInput] = useState("")
   const [commisionInput, setCommisionInput] = useState("")

   const addIngredient = () => {
      if(ingredientInput.length !== 0){
         AddIngredient(ingredientInput).then(() => {
            setIngredientInput("")
            loadIngredients()
         })
      }
      return null;
   };

   const deleteIngredient = (item) => {
      const confirm = window.confirm(`Delete "${item}"?`)
      if(!confirm) return;

      DeleteIngredient(item).then(() => {
         loadIngredients()
      }).catch(err => {
         console.log('error ', err)
      })
   }

   const addTag = () => {
      if(tagInput.length !== 0){
         AddTag(tagInput).then(() => {
            setTagInput("")
            loadTags()
         })
      }
      return null;
   };

   const deleteTag = (item) => {
      const confirm = window.confirm(`Delete "${item}"?`)
      if(!confirm) return;

      DeleteTag(item).then(() => {
         loadTags()
      }).catch(err => {
         console.log('error ', err)
      })
   }

   const addAdmin = () => {
      if(adminInput.length !== 0){
         AddAdmin(adminInput).then(() => {
            setAdminInput("")
            loadAdmins()
         })
      }
      return null;
   };

   const deleteAdmin = (item) => {
      const confirm = window.confirm(`Delete "${item}"?`)
      if(!confirm) return;

      DeleteAdmin(item).then(() => {
         loadAdmins()
      }).catch(err => {
         console.log('error ', err)
      })
   }

   const updateCommision = () => {
      if(commisionInput.length === 0){
         alert('please enter commision')
         return
      }
      let commisionInt = 0

      try{
         commisionInt = parseInt(commisionInput)
      }catch(ex){
         alert('Invalid commision value')
         return
      }

      UpdateCommision(commisionInt).then(() => {
         loadCommision()
         setCommisionInput('')
      }).catch(err => console.log('error updating commision', err))
   }

   const loadIngredients = () => {
      GetIngredients().then(value => {
         setIngredients(value)
      })
   }

   const loadTags = () => {
      GetTags().then(value => {
         setTags(value)
      })
   }

   const loadAdmins = () => {
      GetAdmins().then(value => {
         setAdmins(value)
      })
   }

   const loadCommision = () => {
      GetCommision().then(value => {
         setCommision(value)
      }).catch(err => console.log('Commision Error', err))
   }

   useEffect(() => {
      loadIngredients()
      loadTags()
      loadAdmins()
      loadCommision()
   }, [])

   return (
      <div className="nav-container">
         <Navigation />
         <MobileNavigationTop />
         <div className="main">
            <h1>Configuration</h1>
            <div>
               <hr />
               <div>
                  <h3>Ingredients</h3>
                  <div className="tagsOuterContainer">
                     {ingredients.map(item => {
                        return(
                           <div className="tagsContainer flex-row">
                              <p>{item}</p>
                              <button
                                 onClick={() => deleteIngredient(item)}
                                 className="deleteTabButton">
                                 <i class="fas fa-trash"></i>
                              </button>
                           </div>
                        )
                     })}
                  </div>
                  <div className="addTaxContainer">
                     <div className="inputContainer">
                        <lable>Add Ingredient</lable>
                        <input
                           className="addTaxInput"
                           type="text"
                           value={ingredientInput}
                           onChange={(e) => {
                              setIngredientInput(e.target.value);
                           }}
                        />
                     </div>
                     <button onClick={addIngredient}>Add Ingredient</button>
                  </div>
               </div>
               <hr />

               <div>
                  <h3>Tags</h3>
                  <div className="tagsOuterContainer">
                     {tags.map(item => {
                        return(
                           <div className="tagsContainer flex-row">
                              <p>{item}</p>
                              <button onClick={() => deleteTag(item)} className="deleteTabButton">
                                 <i class="fas fa-trash"></i>
                              </button>
                           </div>
                        )
                     })}
                  </div>
                  <div className="addTaxContainer">
                     <div className="inputContainer">
                        <lable>Tag</lable>
                        <input
                           className="addTaxInput"
                           type="text"
                           value={tagInput}
                           onChange={(e) => {
                              setTagInput(e.target.value);
                           }}
                        />
                     </div>
                     <button onClick={addTag}>Add Tag</button>
                  </div>
               </div>

               <hr />
               <div>
                  <h3>Admins</h3>
                  <div className="tagsOuterContainer">
                     {admins.map(item => {
                        return(
                           <div className="tagsContainer flex-row">
                              <p>{item}</p>
                              <button onClick={() => deleteAdmin(item)} className="deleteTabButton">
                                 <i class="fas fa-trash"></i>
                              </button>
                           </div>
                        )
                     })}
                  </div>
                  <div className="addTaxContainer">
                     <div className="inputContainer">
                        <lable>Admin Phone number (+(countryCode)(phone))</lable>
                        <input
                           className="addTaxInput"
                           type="text"
                           value={adminInput}
                           onChange={(e) => {
                              setAdminInput(e.target.value);
                           }}
                        />
                     </div>
                     <button onClick={addAdmin}>Add Admin</button>
                  </div>
               </div>

               <hr />
               <div>
                  <h3>Comission percentage</h3>
                  <div className="flex-row">
                     <b>Current comission percentage : </b>
                     <p> {commision}%</p>
                  </div>
                  <div className="flex-row">
                     <lable>Change Comission percentage</lable>
                     <input
                        className="addTaxInput"
                        type="text"
                        value={commisionInput}
                        onChange={(e) => {
                           setCommisionInput(e.target.value);
                        }}
                     />
                     <button onClick={updateCommision}>
                        Update
                     </button>
                  </div>
               </div>
            </div>
            <br /><br /><br />
         </div>
         <div className="footer">
            <MobileNavigationBottom />
         </div>
      </div>
   );
};

export default Configuration;
