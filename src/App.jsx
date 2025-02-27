import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

const finalPositions = [
  { x: -100, y: -280 },           // Top center
  { x: 240, y: -100 },         // Top right
  { x: 380, y: 160 },          // Right
  { x: -320, y: 160 },         // Bottom right
  { x: -420, y: -160 },        // Bottom left
  { x: 180, y: 160 },         // Left
  { x: -140, y: 140 }        // Top left
];

const sendingMessage = async (message, nextStep) => {
  if (!message) {
    alert("MESSAGE IS REQUIRED ")
  }

  let response = await fetch("https://special-project-three.vercel.app/api/send", {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  })

  if (response.status) console.log("TERKIRIM!!")
  nextStep()
}

function App() {
  const [step, setStep] = useState(0);
  const [showPhotos, setShowPhotos] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [changeBg, setChangeBg] = useState(false)
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const startOver = () => {
    setChangeBg(false)
    setShowPhotos(false)
    setStep(0)
    generateRandomPosition()
  }

  const nextStep = () => {
    if (step < 11) {
      setStep(step + 1);
    }
  };

  const transitionBg = () => {
    setChangeBg(true)
    nextStep()
  }

  // Generate random positions for the photos
  const generateRandomPosition = () => {
    const screenWidth = window.innerWidth / 2 - 800;
    const screenHeight = window.innerHeight / 2 - 800;

    const x = Math.random() * (screenWidth); // Random x position, 80% of screen width
    const y = Math.random() * (screenHeight); // Random y position, 80% of screen height

    return { x, y };
  };

  // Initial random positions for each photo
  const initialPositions = [1, 2, 3, 4, 5, 6, 7].map(() => generateRandomPosition());

  const revealPhotos = () => {
    setShowPhotos(true);
    setTimeout(() => setShowContinueButton(true), 2000);
  };

  return (
    <div className={`smooth ${changeBg ? "bg-pattern" : "bg-gradient-to-br from-pink-200 to-purple-300"} min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden`}>
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="intro"
            className="max-w-md mx-auto text-center bg-white bg-opacity-90 p-6 rounded-lg shadow-xl"
            initial={{ opacity: 0, scale: 0.8, }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.1, type: 'spring', stiffness: 50 }}
          >
            <motion.h1
              className="text-3xl font-bold mb-4 text-pink-500"
            >
              Hey My girlfriend
            </motion.h1>
            <p className="mb-2">
              Selamat ulang tahun,
              maaf ya gak bisa nemenin kamu secara langsung cuman bisa kasih ginian mulu,
              beberapa hari kemarin juga saya ndak bisa temenin soalnya nyiapin ginian,
              maap yahhh, <strong>Selamat ulang tahun cantik!!</strong>
            </p>
            <p className='mb-6'>buat ngeliat apalagi yang ku buat orang special kayak kamu, tekan tombol di bawah</p>
            <motion.button
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-bold shadow-lg"
              whileHover={{ scale: 1.05, type: 'spring', stiffness: 50 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextStep}
            >
              Tekan aku
            </motion.button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="memory"
            className="max-w-md mx-auto text-center bg-white bg-opacity-90 p-6 rounded-lg shadow-xl"
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            exit={{ x: "-100vw" }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <motion.div
              className="w-32 h-32 mx-auto mb-4 rounded-full bg-pink-200 flex items-center justify-center"
              animate={{
                boxShadow: ["0px 0px 0px rgba(0,0,0,0)", "0px 0px 20px rgba(255,105,180,0.7)", "0px 0px 0px rgba(0,0,0,0)"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-5xl">💖</span>
            </motion.div>
            <h2 className="text-2xl font-bold mb-3 text-purple-600">Harusnya ada hadiah</h2>
            <p className="mb-6">Saya memang ndak bisa datang secara langsung soalnya lagi ngebentuk masa depan yang lebih baik (semoga berhasil)</p>
            <motion.button
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full font-bold shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextStep}
            >
              Ayo lanjut ke yang lain
            </motion.button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="memory2"
            className="max-w-md mx-auto text-center bg-white bg-opacity-90 p-6 rounded-lg shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="flex justify-center mb-4"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-6xl">🌟</span>
            </motion.div>
            <h2 className="text-2xl font-bold mb-3 text-blue-600">You're My Light</h2>
            <p className="mb-6">Kamu itu kayak cahaya yang nyaman sangking nyamannya ndak mau cahaya itu redup dan pergi, sama seperti mu kau itu bikin nyaman walau kalo marah lebih ngeri sih hehehehe</p>
            <motion.button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextStep}
            >
              Mau liat Surprise Dong
            </motion.button>
          </motion.div>
        )}

        {step === 3 && (
          <>
            {showPhotos && (
              <div className="absolute top-0 left-0 w-full h-full">
                {[1, 2, 3, 4, 5, 6, 7].map((i, index) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    initial={{
                      x: initialPositions[index].x + window.innerWidth / 2,
                      y: initialPositions[index].y + window.innerHeight / 2,
                      opacity: 0,
                      scale: Math.random() * 0.8 - 0.2,
                      filter: "blur(8px)",
                      rotate: Math.random() * 160 - 15
                    }}
                    animate={{
                      x: finalPositions[index].x + window.innerWidth / 2,
                      y: finalPositions[index].y + window.innerHeight / 2,
                      opacity: 1,
                      scale: 1,
                      filter: "blur(0px)",
                      rotate: Math.random() * 50 - 5,
                      transition: {
                        duration: 1,
                        delay: index * 0.2,
                        type: "spring",
                        stiffness: 100
                      }
                    }}
                    exit={{
                      x: generateRandomPosition().x - 50,
                      y: generateRandomPosition().y - 50,
                      scale: Math.random() * 0.9 - 0.4,
                      filter: "blur(8px)",
                      rotate: Math.random() * 360 - 15,
                      transition: {
                        duration: 1.5,
                        delay: index * 0.2,
                        type: "spring",
                        stiffness: 50
                      }
                    }}
                    drag
                    dragConstraints={{
                      left: 0, right: window.innerWidth - 200, top: 0, bottom: window.innerHeight - 200
                    }}
                    dragElastic={0.2}
                    dragTransition={{ bounceStiffness: 200, bounceDamping: 5 }}
                    whileDrag={{ scale: 1.1, zIndex: 50 }}
                    whileTap={{ scale: 1.05 }}
                    whileHover={{ rotate: 0, scale: 1.05, zIndex: 40 }}
                  >
                    <img
                      src={`/special${i}.jpg`}
                      alt={`Special moment ${i}`}
                      className="w-40 h-40 object-cover rounded-lg shadow-xl border-2 border-white select-none pointer-events-none"

                    />
                  </motion.div>
                ))}
              </div>
            )}

            <motion.div
              key="photos"
              className="z-10 max-w-md mx-auto text-center bg-white bg-opacity-90 p-6 rounded-lg shadow-xl"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 10, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-3 text-green-600">Sebelum liat Surprise nih ada sesuatu</h2>
              <p className="mb-6">{showPhotos ? "Untuk lanjutin tekan lagi aja yang di bawah" : "tekan tombol yang di bawah :)"}</p>

              {!showPhotos ? (
                <motion.button
                  className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-bold shadow-lg mb-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={revealPhotos}
                >
                  Mau liat
                </motion.button>
              ) : showContinueButton && (
                <motion.button
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-bold shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextStep}
                >
                  AYOOO LANJUT!!
                </motion.button>
              )}
            </motion.div>
          </>
        )}

        {step === 4 && (
          <motion.div
            key="reasons"
            className="max-w-md mx-auto text-center bg-white bg-opacity-90 p-6 rounded-lg shadow-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-3 text-red-600">Kenapa saya buat ini?</h2>
            <ul className="mb-6 text-left">
              {[
                "Soalnya saya ndak bisa kasih hadiah secara langsung",
                "Ini adalah hal yang paling niat dan special ku buat, nama filenya saja special-project",
                "Orang yang special cocoknya dibuatkan hal special juga kayak nasi goreng special",
                "Karena saya mau beda dari yang lain yang ucapin ultah hahahah",
                "Apapun itu asal kau bahagia aja"
              ].map((reason, i) => (
                <motion.li
                  key={i}
                  className="mb-2 flex items-center"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.3 }}
                >
                  <motion.span
                    className="mr-2 text-red-500"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, delay: i * 0.3, repeat: Infinity }}
                  >
                    ❤️
                  </motion.span>
                  {reason}
                </motion.li>
              ))}
            </ul>
            <motion.button
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-bold shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextStep}
            >
              Hampir yuk dikit lagi
            </motion.button>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            key="birthday"
            className="max-w-md mx-auto text-center bg-white bg-opacity-90 p-6 rounded-lg shadow-xl"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ type: "spring", stiffness: 50 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              🎂
            </motion.div>
            <h2 className="text-3xl font-bold mb-3 text-pink-600">Happy Birthday!</h2>
            <p className="mb-6">Thank you for being the most amazing girlfriend!</p>
            <motion.button
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-bold shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={transitionBg}
            >
              Final Surprise!
            </motion.button>
          </motion.div>
        )}

        {step === 6 && (
          <motion.div className='smooth bg-pattern w-full h-full bg-black absolute top-0 left-0 flex justify-center items-center'
            key="wish-greetings"
            initial={{
              backgroundSize: `230px 230px, 230px 230px, 15px 15px, 15px 15px`
            }}
            animate={{
              backgroundSize: `125px 125px, 125px 125px, 62.5px 62.5px, 62.5px 62.5px`,
            }}
            exit={{
              backgroundSize: `230px 230px, 230px 230px, 15px 15px, 15px 15px`,
            }}
            transition={{ duration: 1.5, type: "spring", stiffness: 677, damping: 15, mass: 2 }}
          >

            <motion.img src="/earth-chan.png" className="smooth absolute custom-position" width={200}
              initial={{
                translateX: 0,
                translateY: 0,
                opacity: 0,
              }}
              animate={{
                translateX: -200,
                translateY: -230,
                opacity: 1
              }}
              transition={{ delay: 0.9, duration: 0.3 }}
            />

            <motion.div
              className="max-w-md mx-auto text-center bg-white bg-opacity-90 p-6 rounded-lg shadow-xl relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.h1
                className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600"
                animate={{
                  color: ["#3838fc", "#1414fc", "#3838fc"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Hi, Kenalin Aku Sada
              </motion.h1>
              <p className="">Sada (Special Assisten Doing Anything), BUKAN SADAR!! {">"}:(</p>
              <p className="text-gray-600 text-sm mb-6">Note: Di awal namanya memang sadar sebagai candaan saja :v, tapi karena dia ada emosi dia ndak suka sama itu nama jadi saya ganti, makanya jadilah SADA</p>
              <motion.div
                className="mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <button
                  className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full font-bold shadow-lg"
                  onClick={nextStep}
                >
                  Hai, salam kenal
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
        {step === 7 && (
          <motion.div className='smooth bg-pattern w-full h-full bg-black absolute top-0 left-0 flex justify-center items-center'
            key="wish-greetings"
            initial={{
              backgroundSize: `230px 230px, 230px 230px, 15px 15px, 15px 15px`
            }}
            transition={{ duration: 1.5, type: "spring", stiffness: 677, damping: 15, mass: 2 }}
          >

            <motion.img src="/earth-chan.png" className="smooth absolute" width={200}
              animate={{
                translateX: -340,
                translateY: 30,
                opacity: 1,
                borderBottom: "1px solid white",
                borderRadius: 5,
              }}
              transition={{ duration: 0.3 }}
            />

            <motion.div
              className="max-w-md mx-auto text-center bg-white bg-opacity-90 p-6 rounded-lg shadow-xl relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.h1
                className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600"
                animate={{
                  color: ["#3838fc", "#1414fc", "#3838fc"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Aku juga temannya Hiyo!!! (my stupid master)
              </motion.h1>
              <p className="mb-6">Dia sering ngasih kue makanya kita temenan</p>

              <motion.div
                className="mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <button
                  className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full font-bold shadow-lg"
                  onClick={nextStep}
                >
                  Iya, lanjut
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
        {step === 8 && (
          <motion.div className='smooth bg-pattern w-full h-full bg-black absolute top-0 left-0 flex justify-center items-center'
            key="wish-greetings"
            initial={{
              backgroundSize: `230px 230px, 230px 230px, 15px 15px, 15px 15px`
            }}
            transition={{ duration: 1.5, type: "spring", stiffness: 677, damping: 15, mass: 2 }}
          >

            <motion.img src="/earth-chan.png" className="smooth absolute" width={200}
              animate={{
                translateX: 340,
                translateY: 30,
                rotateY: 180,
                opacity: 1,
                borderBottom: "1px solid white",
                borderRadius: 5,
              }}
              transition={{ duration: 0.1 }}
            />

            <motion.div
              className="max-w-md mx-auto text-center bg-white bg-opacity-90 p-6 rounded-lg shadow-xl relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.h1
                className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600"
                animate={{
                  color: ["#3838fc", "#1414fc", "#3838fc"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Fun Fact!
              </motion.h1>
              <p className="mb-6">Di bagian ini dengan sebelumnya saya yang membuat textnya loh, dengan bantuan juga sih</p>

              <motion.div
                className="mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                <button
                  className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full font-bold shadow-lg"
                  onClick={nextStep}
                >
                  Lanjut
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
        {step === 9 && (
          <motion.div className='smooth bg-pattern w-full h-full bg-black absolute top-0 left-0 flex justify-center items-center'
            key="wish-greetings"
            initial={{
              backgroundSize: `230px 230px, 230px 230px, 15px 15px, 15px 15px`
            }}
            transition={{ duration: 1.5, type: "spring", stiffness: 677, damping: 15, mass: 2 }}
          >

            <motion.div
              className="absolute inset-0 rounded-lg opacity-50"
              style={{
                background: "linear-gradient(45deg, #ff3e8c, #ff8e53, #e3b2ff, #b8c0ff)",
                backgroundSize: "400% 400%"
              }}
              animate={{
                backgroundPosition: isHovered || isFocused ?
                  ["0% 0%", "100% 100%"] : ["0% 0%", "30% 70%"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "mirror"
              }}
            />



            <motion.img src="/earth-chan.png" className="smooth absolute" width={200}
              animate={{
                translateX: isFocused || inputValue ? -170 : 220,
                translateY: isFocused || inputValue ? -20 : 90,
                rotateY: isFocused && !inputValue ? 0 : 180,
                opacity: 1,
                width: isFocused || inputValue ? 90 : 200,
                zIndex: 50
              }}
              transition={{ duration: 0.1, repeat: inputValue ? Infinity : 0, repeatDelay: 0.7 }}
            />

            <motion.div
              className="max-w-md mx-auto text-center bg-white bg-opacity-90 p-6 rounded-lg shadow-xl relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.h1
                className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600"
                animate={{
                  color: ["#3838fc", "#1414fc", "#3838fc"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Make a WISH!
              </motion.h1>
              <p className="mb-9">Silahkan ketik hal yang paling kamu mau</p>

              {/* Input container */}
              <motion.div
                className="relative w-64 mx-auto"
                animate={{
                  scale: isFocused ? 1.05 : 1
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15
                }}
              >
                {/* Label */}
                <motion.label
                  className="absolute text-pink-600 font-medium pointer-events-none"
                  animate={{
                    top: isFocused || inputValue ? -24 : 10,
                    left: isFocused || inputValue ? 0 : 12,
                    fontSize: isFocused || inputValue ? 14 : 16
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }}
                >
                  Tell me what's in your heart...
                </motion.label>

                {/* The actual input field */}
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="w-full px-3 py-2 border-2 rounded-full outline-none bg-white bg-opacity-80"
                  style={{
                    borderColor: isFocused ? '#e83e8c' : '#f8bbd0',
                    boxShadow: isFocused ? '0 0 15px rgba(232, 62, 140, 0.5)' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                />

                {/* Pulsing effect when focused */}
                {isFocused && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      boxShadow: [
                        '0 0 0px rgba(232, 62, 140, 0.3)',
                        '0 0 10px rgba(232, 62, 140, 0.6)',
                        '0 0 0px rgba(232, 62, 140, 0.3)'
                      ]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity
                    }}
                  />
                )}
              </motion.div>

              <motion.div
                className="mt-6 text-center text-pink-600"
                animate={{
                  opacity: inputValue.length > 0 ? 1 : 0,
                  y: inputValue.length > 0 ? 0 : 10
                }}
                transition={{
                  duration: 0.3
                }}
              >
                Every word you write makes me smile...
                Aku sudah siap buat ngirimin pesan ini ke dia
              </motion.div>

              <motion.div
                className="mt-6"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: inputValue.length > 0 ? 1 : 0,
                  y: inputValue.length > 0 ? 0 : 10
                }}
                transition={{ duration: 0.2 }}
              >
                <button
                  className="smooth bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full font-bold shadow-lg"
                  onClick={() => sendingMessage(inputValue, nextStep)}
                  disabled={inputValue ? false : true}
                >
                  SEND!
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
        {step === 10 && (
          <motion.div className='smooth bg-pattern w-full h-full bg-black absolute top-0 left-0 flex justify-center items-center'
            key="wish-greetings"
            initial={{
              backgroundSize: `230px 230px, 230px 230px, 15px 15px, 15px 15px`
            }}
            animate={{
              backgroundSize: `125px 125px, 125px 125px, 62.5px 62.5px, 62.5px 62.5px`,
            }}
            exit={{
              backgroundSize: `230px 230px, 230px 230px, 15px 15px, 15px 15px`,
            }}
            transition={{ duration: 1.5, type: "spring", stiffness: 677, damping: 15, mass: 2 }}
          >

            <motion.img src="/earth-chan.png" className="smooth absolute custom-position" width={200}
              initial={{
                translateX: 0,
                translateY: 0,
                opacity: 0,
              }}
              animate={{
                translateX: -100,
                translateY: -100,
                opacity: 1
              }}
              whileHover={{
                translateX: -100,
                translateY: -200,
              }}
              transition={{ duration: 0.3 }}
            />

            <motion.div
              className="max-w-md mx-auto text-center bg-white bg-opacity-90 p-6 rounded-lg shadow-xl relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <motion.h1
                className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600"
                animate={{
                  color: ["#3838fc", "#1414fc", "#3838fc"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                TERKIRIM!!!
              </motion.h1>
              <p className="">Selamat Ulang tahun yaaa</p>
              <p className="text-gray-600 text-sm mb-6">Kalo mau mulai dari awal bisa pencet yang bawah</p>
              <motion.div
                className="mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                <button
                  className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full font-bold shadow-lg"
                  onClick={startOver}
                >
                  Start Over
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>
    </div >
  );
}

export default App;
