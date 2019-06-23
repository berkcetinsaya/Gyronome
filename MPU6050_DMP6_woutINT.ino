// I2Cdev and MPU6050 must be installed as libraries, or else the .cpp/.h files
// for both classes must be in the include path of your project
#include "I2Cdev.h"
#include "accelgyro.h"
#include "MPU6050_6Axis_MotionApps20.h"
//#include "MPU6050.h" // not necessary if using MotionApps include file

// Arduino Wire library is required if I2Cdev I2CDEV_ARDUINO_WIRE implementation
// is used in I2Cdev.h
#if I2CDEV_IMPLEMENTATION == I2CDEV_ARDUINO_WIRE
    #include "Wire.h"
#endif
// uncomment "OUTPUT_READABLE_QUATERNION" if you want to see the actual
// quaternion components in a [w, x, y, z] format (not best for parsing
// on a remote host such as Processing or something though)
#define OUTPUT_READABLE_QUATERNION
//#define OUTPUT_READABLE_EULER
#define nonMUX
#define LED_PIN 13
#define M_PI 3.14159265358979323846
#define TCAADDR 0x70
#define GYRO_COUNT 2
bool blinkState = false;
int temp, temp2;

Accelgyro gyro[GYRO_COUNT];
//MPU6050 mpu;
#ifdef nonMUX
  bool dmpReady = false;  // set true if DMP init was successful
  uint8_t mpuIntStatus;   // holds actual interrupt status byte from MPU
  uint8_t devStatus;      // return status after each device operation (0 = success, !0 = error)
  uint16_t packetSize;    // expected DMP packet size (default is 42 bytes)
  uint16_t fifoCount;     // count of all bytes currently in FIFO
  uint8_t fifoBuffer[64]; // FIFO storage buffer

  // orientation/motion vars
  Quaternion q;           // [w, x, y, z]         quaternion container
#endif

// MPU control/status vars

// ================================================================
// ===               INTERRUPT DETECTION ROUTINE                ===
// ================================================================

volatile bool mpuInterrupt = false;     // indicates whether MPU interrupt pin has gone high
void dmpDataReady()
{
  #ifdef nonMUX
    mpuInterrupt = true;
  #endif
  for(int i=0;i<GYRO_COUNT;i++)
  {
    gyro[i].mpuInterrupt=true;
  }
}

void tcaselect(uint8_t i) {
  if (i > 7) return;

  Wire.beginTransmission(TCAADDR);
  Wire.write(1 << i);
  Wire.endTransmission();
  
  /*Wire.beginTransmission(TCAADDR);
  Wire.write(1 << 7);
  Wire.endTransmission();*/
  
}

// ================================================================
// ===                      INITIAL SETUP                       ===
// ================================================================

void setup() 
{
    // join I2C bus (I2Cdev library doesn't do this automatically)
    #if I2CDEV_IMPLEMENTATION == I2CDEV_ARDUINO_WIRE
        Wire.begin();
        //TWBR = 24; // 400kHz I2C clock (200kHz if CPU is 8MHz). Comment this line if having compilation difficulties with TWBR.
    #elif I2CDEV_IMPLEMENTATION == I2CDEV_BUILTIN_FASTWIRE
        Fastwire::setup(400, true);
    #endif

    // initialize serial communication
    Serial.begin(115200);
    while (!Serial); // wait for Leonardo enumeration, others continue immediately

    for(int i=0; i<GYRO_COUNT;i++)
    {
      tcaselect(i);

      Serial.println(F("Initializing I2C devices..."));
      gyro[i].mpu.initialize();

      Serial.println(F("Testing device connections..."));
      Serial.println(gyro[i].mpu.testConnection() ? F("MPU6050 connection successful") : F("MPU6050 connection failed"));
      Serial.println(F("\nSend any character to begin DMP programming and demo: "));

      Serial.println(F("Initializing DMP..."));
      gyro[i].devStatus = gyro[i].mpu.dmpInitialize();
   //0// -1990  -2009 621 55  186 -82
   //1// -1202 -3657 1503  52  -31 48
   //2//  2100  -647  1106  35  -98 -24
   //3// -2019  1390  844 92  7 14
   //4// -664 -3432 1184  88  -42 -44
   //5// -4798 -2626 1035  136 43  0
   //6// -4032 1634  1331  6 -32 -33
   //7// -5260 674 1340  53  -76 18
  switch(i){
    case 0:
      gyro[i].mpu.setXGyroOffset(55); //49
      gyro[i].mpu.setYGyroOffset(186); //-32
      gyro[i].mpu.setZGyroOffset(-82); //43
      gyro[i].mpu.setXAccelOffset(-1990); //-1295
      gyro[i].mpu.setYAccelOffset(-2009); //-3733
      gyro[i].mpu.setZAccelOffset(621); //1485
      break;
    case 1:
      gyro[i].mpu.setXGyroOffset(52); //49
      gyro[i].mpu.setYGyroOffset(-31); //-32
      gyro[i].mpu.setZGyroOffset(48); //43
      gyro[i].mpu.setXAccelOffset(-1202); //-1295
      gyro[i].mpu.setYAccelOffset(-3657); //-3733
      gyro[i].mpu.setZAccelOffset(1503); //1485
      break;
    case 2:
      gyro[i].mpu.setXGyroOffset(35); //49
      gyro[i].mpu.setYGyroOffset(-98); //-32
      gyro[i].mpu.setZGyroOffset(-24); //43
      gyro[i].mpu.setXAccelOffset(2100); //-1295
      gyro[i].mpu.setYAccelOffset(-647); //-3733
      gyro[i].mpu.setZAccelOffset(1106); //1485
      break;
    case 3:
      gyro[i].mpu.setXGyroOffset(92); //49
      gyro[i].mpu.setYGyroOffset(7); //-32
      gyro[i].mpu.setZGyroOffset(14); //43
      gyro[i].mpu.setXAccelOffset(-2019); //-1295
      gyro[i].mpu.setYAccelOffset(1390); //-3733
      gyro[i].mpu.setZAccelOffset(844); //1485
      break;
    case 4:
      gyro[i].mpu.setXGyroOffset(88); //49
      gyro[i].mpu.setYGyroOffset(-42); //-32
      gyro[i].mpu.setZGyroOffset(-44); //43
      gyro[i].mpu.setXAccelOffset(-664); //-1295
      gyro[i].mpu.setYAccelOffset(-3432); //-3733
      gyro[i].mpu.setZAccelOffset(1184); //1485
      break;
    case 5:
      gyro[i].mpu.setXGyroOffset(136); //49
      gyro[i].mpu.setYGyroOffset(43); //-32
      gyro[i].mpu.setZGyroOffset(0); //43
      gyro[i].mpu.setXAccelOffset(-4798); //-1295
      gyro[i].mpu.setYAccelOffset(-2626); //-3733
      gyro[i].mpu.setZAccelOffset(1035); //1485
      break;
    case 6:
      gyro[i].mpu.setXGyroOffset(6); //49
      gyro[i].mpu.setYGyroOffset(-32); //-32
      gyro[i].mpu.setZGyroOffset(-33); //43
      gyro[i].mpu.setXAccelOffset(-4032); //-1295
      gyro[i].mpu.setYAccelOffset(1634); //-3733
      gyro[i].mpu.setZAccelOffset(1331); //1485
      break;
    case 7:
      gyro[i].mpu.setXGyroOffset(53); //49
      gyro[i].mpu.setYGyroOffset(-76); //-32
      gyro[i].mpu.setZGyroOffset(18); //43
      gyro[i].mpu.setXAccelOffset(-5260); //-1295
      gyro[i].mpu.setYAccelOffset(674); //-3733
      gyro[i].mpu.setZAccelOffset(1340); //1485
      break;
    default:
      gyro[i].mpu.setXGyroOffset(51); //49
      gyro[i].mpu.setYGyroOffset(-30); //-32
      gyro[i].mpu.setZGyroOffset(43); //43
      gyro[i].mpu.setXAccelOffset(-1295); //-1295
      gyro[i].mpu.setYAccelOffset(-3733); //-3733
      gyro[i].mpu.setZAccelOffset(1485); //1485 // 1688 factory default for my test chip
      break;
  }     

      if (gyro[i].devStatus == 0) {
          // turn on the DMP, now that it's ready
          Serial.println(F("Enabling DMP..."));
          gyro[i].mpu.setDMPEnabled(true);

          // enable Arduino interrupt detection
          Serial.println(F("Enabling interrupt detection (Arduino external interrupt 0)..."));
          attachInterrupt(0, dmpDataReady, RISING);
          gyro[i].mpuIntStatus = gyro[i].mpu.getIntStatus();

          // set our DMP Ready flag so the main loop() function knows it's okay to use it
          Serial.println(F("DMP ready! Waiting for first interrupt..."));
          gyro[i].dmpReady = true;

          // get expected DMP packet size for later comparison
          gyro[i].packetSize = gyro[i].mpu.dmpGetFIFOPacketSize();
      } else
      {
          // ERROR!
          // 1 = initial memory load failed
          // 2 = DMP configuration updates failed
          Serial.print(F("DMP Initialization failed (code "));
          Serial.print(gyro[i].devStatus);
          Serial.println(F(")"));
      }
    }
    pinMode(LED_PIN, OUTPUT);
}

// ================================================================
// ===                    MAIN PROGRAM LOOP                     ===
// ================================================================

void loop() 
{
  for(int i=0;i<GYRO_COUNT;i++)
  {
    tcaselect(i);
    // if programming failed, don't try to do anything
    if (!gyro[i].dmpReady) return;

    // wait for MPU interrupt or extra packet(s) available
    while (!gyro[i].mpuInterrupt && gyro[i].fifoCount < gyro[i].packetSize)
    {
        //Serial.println("Stuck inside while");
        if(gyro[i].mpuInterrupt)
        {
          gyro[i].mpuInterrupt=false;
          break;
        }
        else
        {
          gyro[i].mpu.resetFIFO();
          break;
        }
    }

    // reset interrupt flag and get INT_STATUS byte
    gyro[i].mpuInterrupt = false;
    gyro[i].mpuIntStatus = gyro[i].mpu.getIntStatus();
    //Serial.println( gyro[i].mpuIntStatus);

    // get current FIFO count
    gyro[i].fifoCount = gyro[i].mpu.getFIFOCount();

    // check for overflow (this should never happen unless our code is too inefficient)
    if ((gyro[i].mpuIntStatus & 0x10) || gyro[i].fifoCount == 1024)
    {
        // reset so we can continue cleanly
        gyro[i].mpu.resetFIFO();
        //Serial.print(F("FIFO overflow!"));
        //Serial.println(i);
        
        

    // otherwise, check for DMP data ready interrupt (this should happen frequently)
    }
    else if (gyro[i].mpuIntStatus & 0x02)
    {
        // wait for correct available data length, should be a VERY short wait
        while (gyro[i].fifoCount < gyro[i].packetSize) gyro[i].fifoCount = gyro[i].mpu.getFIFOCount();

        // read a packet from FIFO
        gyro[i].mpu.getFIFOBytes(gyro[i].fifoBuffer, gyro[i].packetSize);

        // track FIFO count here in case there is > 1 packet available
        // (this lets us immediately read more without waiting for an interrupt)
        gyro[i].fifoCount -= gyro[i].packetSize;

        #ifdef OUTPUT_READABLE_QUATERNION
            // display quaternion values in easy matrix form: w x y z
            
            gyro[i].mpu.dmpGetQuaternion(&gyro[i].q, gyro[i].fifoBuffer);

            /*            
            Serial.print("quat");
            Serial.print(i);
            Serial.print("\t");
            Serial.print(gyro[i].q.w);
            Serial.print("\t");
            Serial.print(gyro[i].q.x);
            Serial.print("\t");
            Serial.print(gyro[i].q.y);
            Serial.print("\t");
            Serial.println(gyro[i].q.z);
           */
            
            
            
           gyro[0].q.z=gyro[0].q.z*1000;
           gyro[0].q.z= map(gyro[0].q.z, -1000,1000, 570, 810);
           
           gyro[0].q.y=gyro[0].q.y*1000;
           gyro[0].q.y= map(gyro[0].q.y, -1000,1000, 140, 380);
           gyro[1].q.z=gyro[1].q.z*1000;
           gyro[1].q.z= map(gyro[1].q.z, -1000,1000, 440, 940);
           gyro[1].q.y=gyro[1].q.y*1000;
           gyro[1].q.y= map(gyro[1].q.y, -1000,1000, 10, 510);
          
           gyro[2].q.z=gyro[2].q.z*1000;
           gyro[2].q.z= map(gyro[2].q.z, -1000,1000, 485, 965);
                      gyro[2].q.y=gyro[2].q.y*1000;

           gyro[2].q.y= map(gyro[2].q.y, -1000,1000, 220, 700);
           gyro[3].q.z=gyro[3].q.z*1000;
           gyro[3].q.z= map(gyro[3].q.z, -1000,1000, 225, 1225);
                      gyro[3].q.y=gyro[3].q.y*1000;

           gyro[3].q.y= map(gyro[3].q.y, -1000,1000, 10, 860);
           gyro[4].q.z=gyro[4].q.z*1000;
           gyro[4].q.z= map(gyro[4].q.z, -1000,1000, 275, 1275);
                      gyro[4].q.y=gyro[4].q.y*1000;

           gyro[4].q.y= map(gyro[4].q.y, -1000,1000, 10, 860);
           gyro[5].q.z=gyro[5].q.z*1000;
           gyro[5].q.z= map(gyro[5].q.z, -1000,1000, 535, 1015);
                      gyro[5].q.y=gyro[5].q.y*1000;

           gyro[5].q.y= map(gyro[5].q.y, -1000,1000, 220, 700);
           gyro[6].q.z=gyro[6].q.z*1000;
           gyro[6].q.z= map(gyro[6].q.z, -1000,1000, 690, 930);
                      gyro[6].q.y=gyro[6].q.y*1000;

           gyro[6].q.y= map(gyro[6].q.y, -1000,1000, 140, 380);
           gyro[7].q.z=gyro[7].q.z*1000;
           gyro[7].q.z= map(gyro[7].q.z, -1000,1000, 560, 1060);
                      gyro[7].q.y=gyro[7].q.y*1000;

           gyro[7].q.y= map(gyro[7].q.y, -1000,1000, 10, 510);
           

            temp = gyro[i].q.z;
            temp2 = gyro[i].q.y;
            Serial.print(i);
            Serial.print(",");
            Serial.print(temp);
            Serial.print(",");
            Serial.print(temp2);
            Serial.print(",");            
            Serial.println("1");
          

            
        #endif

        #ifdef OUTPUT_READABLE_EULER
            // display Euler angles in degrees
            gyro[i].mpu.dmpGetQuaternion(&gyro[i].q, gyro[i].fifoBuffer);
            gyro[i].mpu.dmpGetEuler(gyro[i].euler, &gyro[i].q);
            Serial.print("euler\t");
            Serial.print(gyro[i].euler[0] * 180/M_PI*10);
            Serial.print("\t");
            Serial.print(gyro[i].euler[1] * 180/M_PI*10);
            Serial.print("\t");
            Serial.println(gyro[i].euler[2] * 180/M_PI*10);
        #endif

    }
  }
  // blink LED to indicate activity
    blinkState = !blinkState;
    digitalWrite(LED_PIN, blinkState);
}
