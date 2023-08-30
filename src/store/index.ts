// import { createStore } from "redux";
// import { createWrapper } from "next-redux-wrapper";
// import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
// import reducers from "./reducers";

// const makeStore = () => {
//   const store = createStore(reducers, composeWithDevTools());

//   return store;
// };

// export const storeWrapper = createWrapper(makeStore, { debug: false });
// // makeStore().subscribe(() => {
// //   localStorage.setItem('reduxState', JSON.stringify(makeStore().getState()));
// // });







// import { createStore } from "redux";
// import { createWrapper } from "next-redux-wrapper";
// import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
// import reducers from "./reducers";

// const makeStore = () => {
//   let persistedState = {};
//   const isBrowser = typeof window !== 'undefined';
  
//   if (isBrowser) {
//     const savedState = localStorage.getItem('reduxState');
//     if (savedState) {
//       try {
//         persistedState = JSON.parse(savedState);
//       } catch (e) {
//         console.error("Erro ao analisar o estado do localStorage:", e);
//       }
//     }
//   }

//   const store = createStore(
//     reducers, 
//     persistedState, // Usando o estado persistido como estado inicial
//     composeWithDevTools()
//   );

//   if (isBrowser) {
//     store.subscribe(() => {
//       console.log('reduxState',store.getState());
//       localStorage.setItem('reduxState', JSON.stringify(store.getState()));
//     });
//   }

//   return store;
// };

// export const storeWrapper = createWrapper(makeStore, { debug: false });



import { createStore } from "redux";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { useRouter } from "next/router"; // Importe o useRouter
import reducers from "./reducers";

const makeStore = () => {
  let persistedState = {};
  const isBrowser = typeof window !== 'undefined';
  
  if (isBrowser) {
    const savedState = localStorage.getItem('reduxState');
    if (savedState) {
      try {
        persistedState = JSON.parse(savedState);
      } catch (e) {
        console.error("Erro ao analisar o estado do localStorage:", e);
      }
    }
  }

  const store = createStore(
    reducers, 
    persistedState,
    composeWithDevTools()
  );

  if (isBrowser) {
    const router = useRouter(); // Inicialize o router

    store.subscribe(() => {
      localStorage.setItem('reduxState', JSON.stringify(store.getState()));
      console.log("Estado atualizado:", store.getState());

      // Verifique o campo "email" no estado e redirecione se necessário
      const userEmail = store.getState().user.email; 
      // if (!userEmail || userEmail.trim() === "") {
      //   router.push("/");
      // }
    });
  }

  return store;
};

export const storeWrapper = createWrapper(makeStore, { debug: false });







