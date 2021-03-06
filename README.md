# ⏰깜빡!
<img src="https://user-images.githubusercontent.com/73685676/158061917-ccef9500-41d6-4630-a212-e3a8e219174c.jpg" width="500px" height="500px" >

**깜빡! 은 내가 오늘 이전에 했던 일들을 기록하고 모아볼 수 있는 모바일 앱입니다.** 

## 🤔깜빡!을 만들게 된 이유
하루 하루 정신없이 살던 중에 잠시 방을 둘러보다보니 공기청정기가 눈에 들어왔습니다. 
그리고 공기청정기의 LED 화면에는 필터를 교체해야한다는 알림이 시뻘겋게 떠 있었습니다. 
도대체 언제부터 필터를 교체해야 한다는 알림이 떠 있었을까요?  
여태 들이마셨던 공기가 상쾌했던 것은 기분 탓이었을까요? 
알 길이 없었습니다.

내가 앞으로 해야할 일들에 대해서는 메모해두고 기억해두려고 노력하지만 정작 </br>
- _내가 오늘 이전에 무엇을 했는지,_ </br>
- _주기적으로 했던 일들에 대해 언제 어디서 무얼 어떻게 했었는지_  </br>
- _어디에 갔었는지_  </br>

에 대해 기록하고 기억하는 것에는 소홀하지 않았나는 생각을 하게 되었습니다. </br>
마치 투두 리스트는 작성하지만 일기는 더 이상 작성하지 않게 되는 것 처럼요!

## 🤔 왜 모바일 앱인가요?
손에 가장 오래 머무르는 물건을 고르라면 저에게는 아마 키보드와 스마트폰일 것입니다. </br>
현대인에게는 스마트폰 없이는 생활이 불가능할 정도라고 할 정도로 생활 필수품이 된 지 오래입니다. </br>

스마트폰을 사용하면서 개인적으로 있었으면 하는 아쉬운 기능들이 종종 있었는데  </br>
개발을 공부하게 되면서 꼭 한 번 나에게 필요한 모바일 앱을 개발해보고 싶다는 생각이 있었습니다.  </br>

## 🧬 기술 스택
### Frontend
- React
- React-Native
- Expo Cli
- Redux / Redux Toolkit
- Lottie.js

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- Google Oauth2
- JWT

### General
- Prettier + ESLint
- AWS Elastic Beanstalk

## .apk 파일 다운로드
구글 앱 스토어 등록이 진행중입니다. 

현재는 apk 파일을 다운받아 설치하면 사용 가능합니다.

[GGam-PPak](https://drive.google.com/file/d/1dvIArgD1_uGitwld7husQJCqLuG2et6O/view?usp=sharing)
## 🔧프로젝트 설명
### Apploading 및 Login

<div>
    <img src="https://user-images.githubusercontent.com/73685676/161699598-0f3dfecf-e408-490f-93cd-20635e60504c.jpg" height="400px" >
    <img src="https://user-images.githubusercontent.com/73685676/161700379-af2b372c-3a25-4b3d-b86a-c8d5db17d0a5.jpg" height="400px" >
</div>

- Splash Screen이 애플리케이션이 로딩 될 동안 보여집니다.
- Google Oauth2과 JWT를 통한 소셜 로그인을 구현했습니다.

### Tasks
<div>
  <img src="https://user-images.githubusercontent.com/73685676/161700579-0144bc70-727a-4cc8-bdcd-71a3595ad051.jpg" height="400px" >
  <img src="https://user-images.githubusercontent.com/73685676/161700684-bb872cb3-b4b7-4b6f-96a9-1aaab90df665.jpg" height="400px" >
  <img src="https://user-images.githubusercontent.com/73685676/161701853-5b482f61-5211-4997-b318-d761769b0ec9.jpg" height="400px" >
</div>

- 해야할 일의 큰 단위를 task 라고 지칭합니다. 
( ex. 병원 1회차, 2회차 .... ⇒ `병원 방문` 이 하나의 task 입니다)
- 하단의 `+` 버튼을 누르면 새로운 Task와 1개의 memo를 생성할 수 있습니다.
- 큰 단위의 일 안에 memo를 작성하여 매 회차 또는 날짜별로 언제 무엇을 어떻게 했는지 기록하고
다음 알림을 지정할 수 있습니다.
    
    (ex. 병원 1회차 ⇒ `1개의 memo` 입니다.)
    
- task를 누르면 해당 task에 속한 memo들을 볼 수 있습니다.
- task를 삭제하거나 task의 제목을 수정할 수 있습니다.
- 실행일은 이 일을 실행한 일, 예정일은 다음 예정일을 입력합니다.

### Memo
<div>
  <img src="https://user-images.githubusercontent.com/73685676/161701605-bb1e325a-cffa-4fe1-ae53-43e8a250cfc2.jpg" height="400px" >
  <img src="https://user-images.githubusercontent.com/73685676/161700940-9ee1d258-6490-4516-a38b-5ff1e029b441.jpg" height="400px" >
  <img src="https://user-images.githubusercontent.com/73685676/161702530-6a1ddf8e-fba3-449c-b86a-93dac1ef48c8.jpg" height="300px" >
</div>
<div>
  <img src="https://user-images.githubusercontent.com/73685676/161701208-bec3878b-ae9c-40fd-8796-1e6b10a9e854.jpg" height="400px" >
  <img src="https://user-images.githubusercontent.com/73685676/161701216-5b226f77-be34-47b8-b2d5-630a19e32d12.jpg" height="400px" >
  <img src="https://user-images.githubusercontent.com/73685676/161701202-136b3176-5b01-4eca-b471-ca11ee54d1e1.jpg" height="300px" >
</div>

- task에 속한 큰 단위의 일에 대해 언제 무엇을 했는지 기록하고 알림을 지정할 수 있습니다.
- 지정한 예정시간이 되면 상단 바에 알림이 뜨게 됩니다.
- 알림 반복은 한 번 외에 매 일, 매 주, 매 년으로 설정할 수 있습니다.
- task의 가장 마지막 memo의 알림 예정일이 기준이 되어 예정일 이전에는 새로운 메모를 작성할 수 없고
예정일 이후에는 새로운 메모를 작성할 수 있지만, 이전의 메모들은 예정일을 제외한 나머지 정보만
수정 가능합니다.

### Calendar
<div>
  <img src="https://user-images.githubusercontent.com/73685676/161702005-8ad3f36a-1ff8-48ff-831f-86943327e080.jpg" height="400px" >
</div>

- 로그인하면 가장 먼저 보이는 메인 화면이자 달력과 함께 작성한 메모들이 해당 요일에 보입니다.
- 작성해 둔 메모를 통해 특정 날짜에 내가 무엇을 했는지를 한 눈에 볼 수 있습니다.
- 하단의 `+` 버튼을 누르면 새로운 Task와 1개의 memo를 생성할 수 있습니다.

### Timeline
<div>
  <img src="https://user-images.githubusercontent.com/73685676/161702133-d5a053aa-9611-4c81-88d1-c13e977582e0.jpg" height="400px" >
  <img src="https://user-images.githubusercontent.com/73685676/161702140-adf8fb89-3597-4d4d-85ca-be839333e90b.jpg" height="400px" >
</div>

- 사용자가 위치 정보 이용에 동의하게 되면 하루 이동기록을 볼 수 있습니다.
- 이동 기록은 삭제할 수 없습니다.
- 지난 날짜들의 이동기록 외에 오늘 지금까지 이동한 거리를 polyline으로 볼 수 있습니다.

### ETC
<div>
  <img src="https://user-images.githubusercontent.com/73685676/161703102-c9606b6d-d7e5-4e78-ba7e-3782750bf5e3.jpg" height="400px" >
</div>

- 옵션 페이지에서 로그아웃을 하거나 알림 / 위치 권한을 조작할 수 있습니다.
- 매일 저녁 10시에 기록해야할 것이 있는 지 묻는 알림을 보냅니다.

## ⏲️프로젝트 스케줄
### 작업 기간
2022.02.21 - 2022.02.27
- 아이디어 구성 및 mockup, schema 작성
[Kanban](https://www.notion.so/f8b1d626ef44430f97204364597d4375?v=d952a520995743a3b9367aff6cc22790)
[Figma](https://www.figma.com/file/TJdSjIP5eln1fnvHcvk4WB/Noti?node-id=0%3A1)
[Schema](https://www.notion.so/DB-schema-modeling-b7522db30f314dd980fe4a80ab89291e)

2022.02.28 - 2022.03.12
- 개발 진행
- 버그 수정 및 리팩토링

## 😫Challenge
### 1. React Native + Expo

모바일 앱을 개발하고 싶다 + React와 문법이 유사하다는 점에 용기를 얻어 시작하게 된 기술 스택이었습니다.

막상 열어 개발을 진행해보니 React와 유사한 것은 ‘React’ 알파벳 5글자뿐인 것 아닐까 싶을 정도로 생각보다 많은 공부가 필요한 기술이었습니다. 내가 생각하는 `모바일 애플리케이션이라면 당연히 지니고 있어야 할 미덕같은 기술` 들을 구현하는 데에 많은 것을 공부하고 고려해야 했다는 것을 깨닫는 데에는 오랜 시간이 필요하지 않았습니다. 

특히 React Native Navigation 과 같은 기술들은 기존의 React를 사용하며 가졌던 아이디어들을 깨고 새로 배워야 했기 때문에 쉽지 않았습니다.

처음 도전하는 모바일 앱 개발이기 때문에 Expo를 함께 사용하면서 편리한 점이 많았던 것은 사실입니다. 
그러나 오히려 Expo로 인해 제약을 받는 부분도 굉장히 많았습니다. Expo이기 때문에 발생하는 오류나 버그, 업데이트가 잘 되지 않은 공식 문서, 자주 deprecated 되는 많은 API들이 개발 속도를 더디게 했습니다. 공식 문서를 따라 기술을 적용하면 이미 그 기술은 다른 기술로 흡수되었거나 deprecated 되어 다시 수정작업을 진행하기도 했습니다. 또, Android에서는 사용이 불가능했던 기술도 적지 않아 난관을 겪은 적이 많았습니다. 

하지만 React Native를 사용해보며 **내가 모바일 앱에서 이렇게 쓰던 게 사실은 이렇게 구현된 것이구나!** 하고 발견하게 되고 적용 해보는 재미가 있었습니다. 다음에 개인적으로 앱 개발에 도전해본다면 Expo를 벗어나 react native 로 조금 더 단단한 앱 개발에 도전해보고 싶다는 소망을 갖게 되었습니다.

### 2. Location Permission & Notification

Timeline 페이지를 구성하는 데에 있어 유저의 현재 위치를 받아오는 것이 필요했습니다. Foreground에 있을 때는 물론, 하루 이동한 거리를 polyline으로 표현해야 하기 때문에 Background 에서도 동작해야 했습니다. Notification또한 마찬가지였습니다.

그러나 Expo 기반으로 작동할 때와 실제 안드로이드 디바이스에서 작동할 때의 결과물이 매우 달랐습니다. 이는 비단 Location, Notification 관련 뿐만 아니라 Expo 기반의 React Native 개발 전반에서 자주 보이는 모습이었습니다.  

Expo에서 작동하지 않는다면 수정을 통해 해결할 수 있었지만 Expo와 실제 디바이스에서의 결과물이 달라 처음에는 많이 힘들었던 기억이 있습니다. Location 및 Notification 관련 작업을 진행하며 Expo의 제약을 체감했었습니다.

### 3. Lottie.js
목표한 기술 구현에 집중하다보니 항상 보이는 부분에 소홀해지는 경향이 있어 이번에는 보여지는 부분을 조금 더 신경쓰고 싶은 생각이 있었습니다. 
Expo CLI 환경에서는 Animation에 대한 제약사항이 많았기 때문에 Splash Screen이 뜨는 앱 로딩 화면에 원하는 애니메이션을 주고 싶어 고민하던 중 발견한 툴이 Lottie.js였습니다.

<div>
  <img src="https://user-images.githubusercontent.com/73685676/158065159-66f9e786-adb9-4fc6-8409-df1d93668026.png" width="500px" >
  <img src="https://user-images.githubusercontent.com/73685676/158065332-a261a705-fcdc-478b-8e22-86f315cd4e2c.gif" width="300px" >
</div>

이전에 영상 관련 일을 했었기 때문에 Adobe After Effect로 직접 조절할 수 있다는 점이 매력적으로 다가왔고, 쉬운 적용법과 나의 애니메이션을 Expo, React-Native는 물론 웹이나 다른 플랫폼에도 모두 사용가능하여 만약 다양한 플랫폼을 개발하게 된다면 모두 유사한 사용자 경험을 제공할 수 있다는 점이 마음에 들어 채택하게 되었습니다.

그러나 기억나지 않는 After Effect 사용법, 프로젝트 말미에 시도하게 되어 상대적으로 시간이 부족하였고, Android Device에서는 Adobe Extension으로 추출한 .json 파일의 움직임이 구현한 샘플과 동일하게 나오지 않는 점 등이 어려움으로 다가왔습니다.

## 🙇‍♀️소감
이번 개인 프로젝트를 진행하며 저는 처음 기획한 내용대로 100% 구현하고자 노력했습니다. 그러나 React Native로 첫 개발을 진행하며 예상치 못한 챌린지들을 마주치게 되어 정해진 시간 안에 현실적으로 구현이 가능한 기술들을 우선 구현하고 기간 내에 미처 함께하지 못한 기능들이 존재하여 많이 아쉬웠습니다. 

초기 기획단계, 목업, 스키마 등 리서치를 더욱 꼼꼼히 하고 그것을 기반으로 계획을 세웠다고 생각했는데 돌아보니 아쉬움이 많이 남는 계획이었던 것 같습니다.

그러나 내가 앞으로 직접 사용할 앱이라는 생각에 아쉬웠던 부분을 떠올리며 계속해서 기술을 추가해보고 유지 및 보수를 진행해보고 싶습니다. 

분명 부트캠프를 시작할 때는 도움을 주시는 분들이 주변에 많이 있었습니다. 많은 멘토님들과 동기들이 같은 고민을 하고 어려운 부분은 함께 고민하여 해결해 나갔었습니다. 덕분에 새로운 기술을 무서워하지 않고 도전해볼 수 있었던 것 같습니다.

그러나 개인 프로젝트는 오롯이 저 혼자 해결해 나가야 했었습니다. 과연 내가 React도 아니고 처음 해보는 React Native로 스스로 개발할 수 있을까? 플랜을 짜고 개발을 진행하면서도 불안했던 것이 사실입니다.

그러나 소감을 작성중인 지금 그래도 어떻게든 해냈구나 하는 안도감과 조금 더 빨리, 더 잘 할 수 있었을텐데 하는 아쉬움이 교차합니다. 

부트캠프를 진행하며 스스로 알아보고 공부해보는 경험이 개인 프로젝트를 진행하면서 정말 많은 도움이 되었습니다. 
해결해보기 위해 검색하고 책을 찾아보고, 강의를 들어보는 모든 과정이 저에게 있어 공부가 되었습니다. 새로운 기술을 배우고 도전해보는 것이 마냥 두렵게만 다가오지 않고 오히려 즐거운 경험이 되었습니다. 
이제는 도전은 물론, 단단하게 공부하여 완성도 높은 코드를 작성하는 그런 프론트앤드 개발자가 되고 싶습니다.
