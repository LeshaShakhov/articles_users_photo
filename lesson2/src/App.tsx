import React from 'react';
import ResponsiveAppBar from "./Components/AppBar";
import {Articles} from "./Components/Articles/Articles";
import {GlobalModal} from "./Components/Modals/GlobalModal";

function App() {
  return (
      <>
        <ResponsiveAppBar/>
          <GlobalModal>
            <Articles/>
          </GlobalModal>
      </>

  );
}

export default App;
