import React, { useState } from "react";
import {
   Navigation,
   MobileNavigationTop,
   MobileNavigationBottom,
} from "../components/navigation/navigation";
import "./css/Configuration.css";

const Configuration = () => {
   // ingredient array ----------------------------------------------------

   const ingredientsArray = ["Vegitable", "Egg", "Banana", "Potato"];

   const [ingredient, setIngredient] = useState();

   // add tag -------------------------------------------------

   const addIngredient = () => {
      return null;
   };

   // Delete Tags button -------------------------------------

   const deleteIngredient = () => {
      return null;
   };

   // Tag section ----------------------------------------------

   const tags = ["veg", "no-ve", "lectose", "non-allergic"];

   const [tag, setTag] = useState();

   // add tag -------------------------------------------------

   const addTag = () => {
      return null;
   };

   // Delete Tags button -------------------------------------

   const deleteTag = () => {
      return null;
   };

   // comission section -------------------------------------------

   const currentComissionPercentage = "5%";

   const [comission, setComission] = useState();

   // admin section -----------------------------------------------

   const phone = ["+919545462588", "+919541256258", "+919545147588"];

   const [adminPhone, setAdminPhone] = useState();

   /// save everything *******--------------------*****************

   const save = () => {
      return null;
   };

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
                     <div className="tagsContainer flex-row">
                        <p>{ingredientsArray[0]}</p>
                        <button
                           onClick={deleteIngredient}
                           className="deleteTabButton"
                        >
                           <i class="fas fa-trash"></i>
                        </button>
                     </div>
                     <div className="tagsContainer flex-row">
                        <p>{ingredientsArray[1]}</p>
                        <button
                           onClick={deleteIngredient}
                           className="deleteTabButton"
                        >
                           <i class="fas fa-trash"></i>
                        </button>
                     </div>
                     <div className="tagsContainer flex-row">
                        <p>{ingredientsArray[2]}</p>
                        <button
                           onClick={deleteIngredient}
                           className="deleteTabButton"
                        >
                           <i class="fas fa-trash"></i>
                        </button>
                     </div>
                     <div className="tagsContainer flex-row">
                        <p>{ingredientsArray[3]}</p>
                        <button
                           onClick={deleteIngredient}
                           className="deleteTabButton"
                        >
                           <i class="fas fa-trash"></i>
                        </button>
                     </div>
                     <div className="tagsContainer flex-row">
                        <p>{ingredientsArray[3]}</p>
                        <button
                           onClick={deleteIngredient}
                           className="deleteTabButton"
                        >
                           <i class="fas fa-trash"></i>
                        </button>
                     </div>
                     <div className="tagsContainer flex-row">
                        <p>{ingredientsArray[3]}</p>
                        <button
                           onClick={deleteIngredient}
                           className="deleteTabButton"
                        >
                           <i class="fas fa-trash"></i>
                        </button>
                     </div>
                     <div className="tagsContainer flex-row">
                        <p>{ingredientsArray[3]}</p>
                        <button
                           onClick={deleteIngredient}
                           className="deleteTabButton"
                        >
                           <i class="fas fa-trash"></i>
                        </button>
                     </div>
                     <div className="tagsContainer flex-row">
                        <p>{ingredientsArray[3]}</p>
                        <button
                           onClick={deleteIngredient}
                           className="deleteTabButton"
                        >
                           <i class="fas fa-trash"></i>
                        </button>
                     </div>
                     <div className="tagsContainer flex-row">
                        <p>{ingredientsArray[3]}</p>
                        <button
                           onClick={deleteIngredient}
                           className="deleteTabButton"
                        >
                           <i class="fas fa-trash"></i>
                        </button>
                     </div>
                     <div className="tagsContainer flex-row">
                        <p>{ingredientsArray[3]}</p>
                        <button
                           onClick={deleteIngredient}
                           className="deleteTabButton"
                        >
                           <i class="fas fa-trash"></i>
                        </button>
                     </div>
                     <div className="tagsContainer flex-row">
                        <p>{ingredientsArray[3]}</p>
                        <button
                           onClick={deleteIngredient}
                           className="deleteTabButton"
                        >
                           <i class="fas fa-trash"></i>
                        </button>
                     </div>
                  </div>
                  <div className="addTaxContainer">
                     <div className="inputContainer">
                        <lable>Add Ingredient</lable>
                        <input
                           className="addTaxInput"
                           type="text"
                           value={ingredient}
                           onChange={(e) => {
                              setIngredient(e.target.value);
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
                     <div className="tagsContainer flex-row">
                        <p>{tags[0]}</p>
                        <button onClick={deleteTag} className="deleteTabButton">
                           <i class="fas fa-trash"></i>
                        </button>
                     </div>
                     <div className="tagsContainer flex-row">
                        <p>{tags[1]}</p>
                        <button onClick={deleteTag} className="deleteTabButton">
                           <i class="fas fa-trash"></i>
                        </button>
                     </div>
                     <div className="tagsContainer flex-row">
                        <p>{tags[2]}</p>
                        <button onClick={deleteTag} className="deleteTabButton">
                           <i class="fas fa-trash"></i>
                        </button>
                     </div>
                     <div className="tagsContainer flex-row">
                        <p>{tags[3]}</p>
                        <button onClick={deleteTag} className="deleteTabButton">
                           <i class="fas fa-trash"></i>
                        </button>
                     </div>
                     <div className="tagsContainer flex-row">
                        <p>{tags[3]}</p>
                        <button onClick={deleteTag} className="deleteTabButton">
                           <i class="fas fa-trash"></i>
                        </button>
                     </div>
                     <div className="tagsContainer flex-row">
                        <p>{tags[3]}</p>
                        <button onClick={deleteTag} className="deleteTabButton">
                           <i class="fas fa-trash"></i>
                        </button>
                     </div>
                     <div className="tagsContainer flex-row">
                        <p>{tags[3]}</p>
                        <button onClick={deleteTag} className="deleteTabButton">
                           <i class="fas fa-trash"></i>
                        </button>
                     </div>
                     <div className="tagsContainer flex-row">
                        <p>{tags[3]}</p>
                        <button onClick={deleteTag} className="deleteTabButton">
                           <i class="fas fa-trash"></i>
                        </button>
                     </div>
                     <div className="tagsContainer flex-row">
                        <p>{tags[3]}</p>
                        <button onClick={deleteTag} className="deleteTabButton">
                           <i class="fas fa-trash"></i>
                        </button>
                     </div>
                     <div className="tagsContainer flex-row">
                        <p>{tags[3]}</p>
                        <button onClick={deleteTag} className="deleteTabButton">
                           <i class="fas fa-trash"></i>
                        </button>
                     </div>
                     <div className="tagsContainer flex-row">
                        <p>{tags[3]}</p>
                        <button onClick={deleteTag} className="deleteTabButton">
                           <i class="fas fa-trash"></i>
                        </button>
                     </div>
                  </div>
                  <div className="addTaxContainer">
                     <div className="inputContainer">
                        <lable>Tag</lable>
                        <input
                           className="addTaxInput"
                           type="text"
                           value={tag}
                           onChange={(e) => {
                              setTag(e.target.value);
                           }}
                        />
                     </div>
                     <button onClick={addTag}>Add Tax</button>
                  </div>
               </div>

               <hr />
               <div>
                  <h3>Comission percentage</h3>
                  <div className="flex-row">
                     <b>Current comission percentage :</b>
                     <p>{currentComissionPercentage}</p>
                  </div>
                  <div className="flex-row">
                     <lable>Change Comission percentage</lable>
                     <input
                        className="addTaxInput"
                        type="text"
                        value={comission}
                        onChange={(e) => {
                           setComission(e.target.value);
                        }}
                     />
                  </div>
               </div>
               <hr />
               <div>
                  <h3>Admin</h3>
                  <p>
                     <b>{phone[0]}</b>
                  </p>
                  <p>
                     <b>{phone[1]}</b>
                  </p>
                  <p>
                     <b>{phone[2]}</b>
                  </p>
               </div>
               <div className="flex-row">
                  <lable>Add admin number</lable>
                  <input
                     className="addTaxInput"
                     type="text"
                     value={adminPhone}
                     onChange={(e) => {
                        setAdminPhone(e.target.value);
                     }}
                  />
               </div>
            </div>
            <div className="buttonContainer">
               <button className="savebutton" onClick={save}>
                  SAVE all changes
               </button>
            </div>
         </div>
         <div className="footer">
            <MobileNavigationBottom />
         </div>
      </div>
   );
};

export default Configuration;
