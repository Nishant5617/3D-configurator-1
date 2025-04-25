

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import SceneContent from "./components/SceneContent";
// import ModelViewer from "./components/ModelViewer";
import QRCodeModal from "./components/QRCodeModal";
import { Suspense } from "react";
import { useConfigurator } from "./components/ConfiguratorContext";
import ModelViewer2 from "./ModelViewer2";



const RouterComponent = () => {
  const { state, actions } = useConfigurator();
  const {
    selectedSize,
    woodFinish,
    handleType,
    handleFinish,
    legOption,
    showQR,
    arUrl,
    options,
  } = state;
  const {
    setSelectedSize,
    setWoodFinish,
    setHandleType,
    setHandleFinish,
    setLegOption,
    setShowQR,
  } = actions;

  // Handle closing the QR modal
  const handleCloseQRModal = () => {
    setShowQR(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <div className="header">
                <h1>3D Product Configurator</h1>
                <p>
                  Real-time 3D customization that brings furniture to
                  life—change colors, materials, and features with ease.
                </p>
              </div>
              <div className="content-wrapper">
                <div className="viewer-container">
                  <Canvas
                    camera={{ position: [1.2, 1.2, 1.2], fov: 45 }}
                    style={{ background: "#f5f5f5" }}
                  >
                    <Suspense fallback={<Html center>Loading...</Html>}>
                      <SceneContent
                        selectedSize={selectedSize}
                        woodFinish={woodFinish}
                        handleType={handleType}
                        handleFinish={handleFinish}
                        legOption={legOption}
                        furnitureOptions={options.furnitureOptions}
                        woodFinishOptions={options.woodFinishOptions}
                        handleOptions={options.handleOptions}
                        handleFinishOptions={options.handleFinishOptions}
                        legOptions={options.legOptions}
                      />
                    </Suspense>
                  </Canvas>
                </div>

                <div className="config-container">
                  <h2>Ancestry</h2>
                  <p>
                    With Ancestry Collection the best from generation to
                    generation is carried forward.
                  </p>
                  <br />
                  <div>
                    <label>Select Size:</label>
                    <select
                      value={selectedSize?.id || ''}
                      onChange={(e) =>
                        setSelectedSize(
                          options.furnitureOptions.find(
                            (option) => option.id === e.target.value
                          )
                        )
                      }
                    >
                      {options.furnitureOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label> Select Wood Finish:</label>
                    <select
                      value={woodFinish?.id || ''}
                      onChange={(e) =>
                        setWoodFinish(
                          options.woodFinishOptions.find(
                            (option) => option.id === e.target.value
                          )
                        )
                      }
                    >
                      {options.woodFinishOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label> Select Handle Type:</label>
                    <select
                      value={handleType?.id || ''}
                      onChange={(e) =>
                        setHandleType(
                          options.handleOptions.find(
                            (option) => option.id === e.target.value
                          )
                        )
                      }
                    >
                      {options.handleOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label> Select Handle Finish:</label>
                    <select
                      value={handleFinish?.id || ''}
                      onChange={(e) =>
                        setHandleFinish(
                          options.handleFinishOptions.find(
                            (option) => option.id === e.target.value
                          )
                        )
                      }
                    >
                      {options.handleFinishOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label>Select Leg Option:</label>
                    <select
                      value={legOption?.id || ''}
                      onChange={(e) =>
                        setLegOption(
                          options.legOptions.find(
                            (option) => option.id === e.target.value
                          )
                        )
                      }
                    >
                      {options.legOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* QR Code Modal */}
              <QRCodeModal 
                isOpen={showQR} 
                onClose={handleCloseQRModal} 
                arUrl={arUrl} 
              />
            </div>
          }
        />
       <Route path="/model-viewer" element={<ModelViewer2 />} />
 
      </Routes>
    </Router>
  );
};

export default RouterComponent;