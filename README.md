# ������ʳ����С����

## ��Ŀ�ṹ
```
mini-program/
������ app.js                 # С��������ļ�
������ app.json               # С����ȫ������
������ app.wxss               # С����ȫ����ʽ
������ config/                # �����ļ�Ŀ¼
��   ������ api.js            # API�ӿ�����
������ utils/                 # ���ߺ���Ŀ¼
��   ������ request.js        # �������󹤾�
������ pages/                 # ҳ���ļ�Ŀ¼
��   ������ index/            # ��ҳ
��   ������ health/           # ������Ϣҳ��
��   ������ chat/             # �Ի�ҳ��
��   ������ recipes/          # ʳ��ҳ��
������ images/               # ͼƬ��ԴĿ¼
```
## ��˽ӿ�˵��

���������С������Ŀ [Diabetes-Recipe-Recommender](https://github.com/Polonnia/Diabetes-Recipe-Recommender)

API��ַ��`https://dominant-bunny-feasible.ngrok-free.app`

> ?? ע�����
> - ��Ҫ��������
> - ��Ҫ�ڱ������к�˷�����

### 1. ������Ϣ�ӿ�
- ��ȡ������Ϣ
  ```
  GET /api/user-data
  �������ݣ�
  {
    height: number,          // ���(cm)
    weight: number,          // ����(kg)
    age: number,             // ����
    gender: string,          // �Ա�
    pre_meal_glucose: number, // ��ǰѪ��(mmol/L)
    pre_meal_insulin: number, // ��ǰ�ȵ���(��λ)
    activity_level: string,   // �ˮƽ
    TDEE: number             // ÿ������������
  }
  ```

- ���½�����Ϣ
  ```
  POST /api/user-data
  �������ݣ�
  {
    height: number,
    weight: number,
    age: number,
    gender: string,
    pre_meal_glucose: number,
    pre_meal_insulin: number,
    activity_level: string
  }
  ```

### 2. �Ի��ӿ�
- ������Ϣ
  ```
  POST /chat
  �������ݣ�
  {
    message: string,         // �û���Ϣ
    user_data: {            // �û���������
      height: number,
      weight: number,
      age: number,
      gender: string,
      pre_meal_glucose: number,
      pre_meal_insulin: number,
      activity_level: string
    }
  }
  �������ݣ�
  {
    message: string,         // AI�ظ�����
    recipes: string[],      // �Ƽ���ʳ�ף������ʳ���Ƽ���
    mealType: string,       // �ʹ�����
    health_score: number,   // ��������
    energy: number,         // ����(kcal)
    PBG: number,           // Ԥ��ͺ�Ѫ��
    carb: number,          // ̼ˮ������(g)
    protein: number,       // ������(g)
    fat: number,           // ֬��(g)
    fiber: number          // ��ʳ��ά(g)
  }
  ```

### 3. ʳ�׽ӿ�
- ��ȡʳ���б�
  ```
  GET /api/recipes/list
  �������ݣ�
  [{
    name: string,           // ʳ������
    mealType: string,       // �ʹ�����
    health_score: number,   // ��������
    energy: number,         // ����(kcal)
    PBG: number,           // Ԥ��ͺ�Ѫ��
    carb: number,          // ̼ˮ������(g)
    protein: number,       // ������(g)
    fat: number,           // ֬��(g)
    fiber: number          // ��ʳ��ά(g)
  }]
  ```

- ����ʳ��
  ```
  POST /update-pref
  �������ݣ�
  {
    recipe: string,         // ʳ������
    rating: number          // ����(0-10)
  }
  ```

## ���ش洢˵��

С����ʹ�� `wx.setStorageSync` �� `wx.getStorageSync` ���б������ݴ洢��

1. ������Ϣ
   ```javascript
   wx.setStorageSync('userData', {
     height: number,
     weight: number,
     age: number,
     gender: string,
     pre_meal_glucose: number,
     pre_meal_insulin: number,
     activity_level: string,
     TDEE: number
   })
   ```

2. ʳ����ʷ
   ```javascript
   wx.setStorageSync('recipeHistory', [{
     time: string,          // ʱ���
     mealType: string,      // �ʹ�����
     recipes: string[],     // ʳ���б�
     stats: {              // Ӫ����Ϣ
       healthScore: number,
       energy: number,
       PBG: number,
       carb: number,
       protein: number,
       fat: number,
       fiber: number
     },
     ratings: {            // ���ּ�¼
       [recipeName]: number
     }
   }])
   ```

3. ������ʷ
   ```javascript
   wx.setStorageSync('chatHistory', [{
     role: string,         // 'user' �� 'assistant'
     content: string       // ��Ϣ����
   }])
   ```