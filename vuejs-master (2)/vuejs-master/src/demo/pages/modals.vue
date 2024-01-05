<script setup lang="ts">
import { Confirm_Show } from '@@/repository/Confirm'
import TManageBalance from '@@/components/TManageBalance.vue'
import TButton from '@@/components/TButton.vue'
import TModal from '@@/components/TModal.vue'
import TAddBalance from '@@/components/TAddBalance.vue'
import documentUpload from '@icons/b-document-upload.svg'
import { useTranslation } from '@@/hooks/useTranslation'
import TFilePicker from '@@/components/TFilePicker.vue'
import { useI18nStore } from '@@/repository/I18n'
import TModalLanguage from '@@/components/TModalLanguage.vue'
import TeleportModalTest from '@@/components/TeleportModalTest.vue'

const __ = useTranslation()

const { currentLanguage, I18n_SetLanguage } = useI18nStore()

const modalModel = ref(false)
const modelModel1 = ref(false)
const modelModel2 = ref(false)
const modelModel3 = ref(false)
const modelModel4 = ref(false)
const modelModel5 = ref(false)
const modelModel7 = ref(false)
const modelModel8 = ref(false)
const modelModel9 = ref(false)
const modelModel10 = ref(false)
const uploadItems = ref([
  { text: 'پیوست تصویر', value: 'image' },
  { text: 'پیوست فایل', value: 'file' },
])

const languages = ref([
  { text: 'فارسی', value: 'fa' },
  { text: 'English', value: 'en' },
])

const uploadPictureValue = ref(uploadItems.value[0])

const uploadTitle = computed(() => uploadPictureValue.value.value === 'image' ? 'فایل مورد نظر را بکشید و رها کنید' : 'فایل مورد نظر را بکشید و رها کنید')

const amount = ref(0)
const items = ref([
  { text: __('tsitfy.increase'), value: 'increase' },
  { text: __('tsitfy.decrease'), value: 'decrease' },
])
const files = ref<Blob[]>([])

const mode = ref<'increase' | 'decrease'>('increase')

const childModalOpen = ref(false)
const parentModalOpen = ref(false)

const language = computed({
  get: () => currentLanguage,
  set(language: Language) {
    I18n_SetLanguage(language)
  },
})

function showModal() {
  modalModel.value = true
}

function showModal3() {
  modelModel1.value = true
}

function handleAction() {
  console.log('success')
}

function showModal4() {
  modelModel2.value = true
}

function showModal6() {
  modelModel5.value = true
}

function showModal7() {
  modelModel7.value = true
}

function showModal8() {
  modelModel8.value = true
}

function showModal9() {
  modelModel9.value = true
}

function showModal10() {
  modelModel10.value = true
}

function handleClickEditButton() {
  Confirm_Show({
    action: handleAction,
    title: 'حذف محیط کار راه پیام',
    details: 'اطلاعات این محیط کاری کامل حذف شده و قابل بازگشت نیست',
    message: 'آیا از حذف محیط کاری راه پیام اطمینان دارید ؟',
    isMessageHTML: true,
    cancelText: __('tsitfy.cancel'),
    okText: __('tsitfy.remove'),
    noClose: false,
    okColor: 'primary',
    corners: 'curve',
  })
}

async function handleSubmit() {
  await console.log('submit')
}

function handleClose() {
  modelModel1.value = false
}

watch(modelModel5, value => {
  if (!value) files.value = []
})

</script>

<!-- eslint-disable @intlify/vue-i18n/no-raw-text -->
<template>
  <p class="@text-h1 p-3">
    مودال ها
  </p>

  <div class="p-3 @card @text-title">
    <p class="@text-h2 mb-4">
      ورودی‌ها:
    </p>
    <p><strong>v-model: </strong> مقدار متغیری که نشان می‌دهد مودال باز باشد یا نه</p>
    <p><strong>useModalBody: </strong> آیا از کلاس modal-body استفاده شود یا نه ؟ (مقدار اولیه true است )</p>
    <p><strong>scroll: </strong> آیا بدنه مودال قابلیت اسکرول داشته باشد یا نه ؟ (مقدار اولیه false است)</p>
    <p><strong>fixHeight: </strong> عرض مودال کامل فضای صفحه را بگیرد یا نه ؟</p>
    <p><strong>maxWidth: </strong> حداکثر طول مودال چه مقداری باشد ؟‌ (مقدار اولیه ۴۸۰ پیکسل است)</p>
    <p><strong>closeIcon: </strong> آیکن خروج نشان داده شود یا نه ؟</p>
    <p><strong>noDrag: </strong>آیا در حالت باتم شیت قابل درگ باشد یا نه؟</p>
  </div>

  <div class="grid grid-cols-2 @bg-black-200 @text-title lg:grid-cols-5">
    <div class="@flex-center flex-col mt-4">
      <div class="mt-7 @card @text-h2 text-center">
        نمونه مودال قابل اسکرول
      </div>
      <TButton @click="showModal()">
        تست
      </TButton>
    </div>
    <TModal v-model="modalModel" scroll>
      <div class="p-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea eius velit nam autem voluptate labore. Cupiditate, a!
        Corporis delectus officia pariatur nulla. Et consectetur quod laboriosam, iure eius nemo nulla.
        Aliquid veniam blanditiis odio porro, explicabo temporibus eaque! Dolorem explicabo, corrupti minima nulla porro
        debitis eaque deserunt nemo voluptatum consectetur hic quo facere ea aliquam nostrum consequuntur quisquam
        voluptatem commodi.
        Maxime fugiat ad ipsum. Libero adipisci commodi rerum nisi! Ducimus, error? Architecto, alias? Nemo dolores
        assumenda molestias illum a voluptatum, consequuntur, blanditiis eius sapiente est, quibusdam dignissimos excepturi?
        Dicta, commodi?
        Ipsam accusamus exercitationem nesciunt nemo atque dolores sequi repellat libero expedita dolore adipisci enim
        dignissimos mollitia nostrum magnam maiores totam quaerat hic aperiam modi, eum asperiores. Qui quisquam at aperiam!
        Quos cupiditate molestiae reprehenderit consequuntur eius quibusdam fuga, pariatur debitis exercitationem omnis
        dolorum dolores corporis necessitatibus autem quas nobis quia et ullam sint sit repellendus officia. Aspernatur, id
        nihil. Fugit!
        Dolorum, culpa quod id aliquid provident iusto vero perspiciatis ipsam modi voluptatum! Recusandae sint, repudiandae
        molestias amet repellendus beatae autem corporis eligendi modi perspiciatis ipsa dicta in aliquid, eaque
        consequuntur.
        Commodi culpa, tempore, asperiores quisquam odit ipsam nulla enim sed rem, magni eius consequuntur necessitatibus
        optio ullam omnis odio quaerat eveniet totam nam reiciendis delectus corporis repudiandae? Sequi, dolorem quaerat.
        Atque debitis error officiis ex, labore non, in quibusdam nisi, aut quasi voluptate dolorem omnis blanditiis et
        quaerat libero at recusandae ratione. Eveniet alias eos non numquam minus? Assumenda, provident.
        Sit, iusto blanditiis? Voluptas esse assumenda numquam, nulla distinctio, rerum libero, nihil voluptatibus quis
        dolorem quisquam quae tempore itaque ab earum magnam ut? Quae, sequi! Consectetur necessitatibus asperiores illo
        debitis.
        Quasi molestiae ex asperiores officia tenetur tempora beatae, numquam voluptate aperiam non nihil. Nesciunt sunt
        vero mollitia soluta, illo laborum non corrupti quia dolore, earum necessitatibus, ex ipsam sint quas!
        Iure sapiente magnam cumque possimus maxime, tempore expedita voluptatem earum ab officia illo animi eius
        consequatur esse numquam architecto! Rem ea quisquam vel aspernatur, expedita voluptatibus omnis rerum error
        corrupti.
        Vero officia doloribus molestias earum, illo quae voluptatem totam incidunt assumenda atque facere nihil repellat
        quisquam, eum sed maiores animi distinctio dignissimos ipsam perspiciatis reiciendis qui. Consequatur natus animi
        est.
        Soluta deserunt tempora qui aut optio excepturi, deleniti magni harum ad fuga voluptatum? Quia corrupti ipsam
        praesentium iure repellat similique ea, consectetur deleniti suscipit nesciunt illo cupiditate. Fuga, nisi iste!
        Rem suscipit alias similique nesciunt facilis praesentium deleniti optio iure rerum recusandae fuga nemo nihil
        tenetur id perspiciatis nulla quaerat quam natus, aperiam veniam pariatur molestias sint odit! Modi, minus!
        Natus molestias facere corporis assumenda tenetur ab omnis temporibus maxime accusamus minima dignissimos
        perspiciatis quam saepe consequuntur eum quasi ad reprehenderit, maiores velit dolorum veniam porro similique in!
        Omnis, et.
        Blanditiis, ex voluptate! Delectus nam excepturi atque adipisci dolores sequi blanditiis voluptate esse cum
        assumenda beatae eaque reprehenderit explicabo autem, tempore inventore maxime exercitationem sed placeat,
        praesentium, nihil tempora! Cupiditate.
        Corrupti, aut. Aliquam nemo necessitatibus in veritatis molestiae sint fugiat nam expedita error veniam. Voluptatem
        quod eligendi vero veritatis natus architecto aut laborum tempora incidunt praesentium, repellendus itaque,
        inventore perspiciatis?
        Adipisci quasi sequi illo officia magni. Ipsa doloribus aspernatur vitae magnam consequuntur hic adipisci animi modi
        sunt labore quam molestiae dicta dignissimos rem pariatur eum aliquam, quibusdam impedit, necessitatibus eligendi.
        Accusantium possimus, enim excepturi sit perferendis illo nobis saepe. Error, deleniti aperiam, assumenda odit
        voluptas officia, aliquam quaerat tenetur corrupti ullam eos laboriosam ad! Fugiat eligendi tempora ratione
        veritatis explicabo?
        In repellendus harum dolorem praesentium illo modi quaerat ipsum sit blanditiis ad expedita assumenda, alias quia
        omnis reprehenderit voluptatibus repudiandae iusto saepe doloribus neque odit inventore vel sapiente? Assumenda, at?
      </div>
    </TModal>
    <div class="@flex-center flex-col my-10">
      <div class="mt-7 @card @text-h2 text-center">
        مودال ManageBalance
      </div>
      <TButton color="tertiary" @click="showModal3()">
        ManageBalance
      </TButton>
    </div>
    <div class="@flex-center flex-col mt-5">
      <div class="mt-7 @text-h2 @card text-center">
        مودال AddBalance
      </div>
      <TButton color="gray" @click="showModal4()">
        AddBalance
      </TButton>
    </div>

    <div class="@flex-center flex-col mt-5">
      <div class="mt-7 @text-h2 @card text-center">
        مودال drag and drop
      </div>
      <TButton color="primary" @click="showModal6()">
        drag and drop
      </TButton>
    </div>

    <TModal v-model="modelModel1">
      <template #header>
        <div class="p-3">
          <img
            src="@@/assets/images/editFund.png"
            alt="no image"
            class="absolute s-96px top-0 left-1/2 -translate-x-50% -translate-y-50% shrink-0"
          >
        </div>
      </template>
      <TManageBalance
        v-model="amount"
        v-model:mode="mode"
        :handle-submit="handleSubmit"
        user-name="مهران محمدی"
        balance="۲۰۰۰۰ ریال"
        :select-items="items"
        @close="handleClose"
      />
    </TModal>
    <TModal v-model="modelModel2" header>
      <template #header>
        <div class="p-3">
          <img
            src="@@/assets/images/addFund.png"
            alt="no image"
            class="s-96px absolute top-0 left-1/2 -translate-x-50% -translate-y-50% shrink-0"
          >
        </div>
      </template>
      <TAddBalance v-model="amount" :handle-submit="handleSubmit" />
    </TModal>
    <div class="@flex-center flex-col my-10">
      <div class="mt-7 @card @text-h2 text-center">
        مودال Confirm
      </div>
      <TButton color="secondary" :action="handleClickEditButton">
        Confirm
      </TButton>
      <TModal v-model="modelModel3">
        <TAddBalance v-model="amount" :handle-submit="handleSubmit" />
      </TModal>
    </div>
    <div class="@flex-center flex-col my-10">
      <div class="mt-7 @card @text-h2 text-center">
        مودال تو در تو
      </div>
      <TButton color="secondary" :action="() => { parentModalOpen = true }">
        باز کردن
      </TButton>
      <TModal v-model="parentModalOpen">
        <div class="py-5">
          این مودال پدر است
          <TButton color="secondary" :action="() => { childModalOpen = true }" class="mt-4">
            باز کردن
          </TButton>
          <TModal v-model="childModalOpen">
            <div class="p-5">
              این مودال فرزند است
            </div>
          </TModal>
        </div>
      </TModal>

      <TModal v-model="modelModel5" :max-width="550">
        <div class="p-6 w-full">
          <TFilePicker
            v-model="files"
            :icon="documentUpload"
            :title="uploadTitle"
            type="both"
            :size-limit-description="'حداکثر حجم فایل آپلود شده باید کمتر از ۲ مگابایت باشد'"
            @cancel="modelModel4 = false"
          />
        </div>
      </TModal>
    </div>
    <div class="@flex-center flex-col my-10">
      <div class="mt-7 @card @text-h2 text-center">
        تست فوتر مودال
      </div>
      <TButton color="secondary" @click="showModal7">
        تست
      </TButton>
      <TModal v-model="modelModel7" corners="curve" footer>
        <p class="@text-h2 mt-5">
          تست فوتر مودال
        </p>
        <p class="max-h-100px mx-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur perspiciatis in exercitationem unde?
          Blanditiis, dolorum tempora cupiditate accusamus magni provident sunt deserunt laboriosam minus sed! Quo error
          et corporis obcaecati? Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum perferendis nesciunt
          nostrum consequatur, fugiat rerum eveniet ea veritatis quidem minus animi voluptas tempora! Amet, est! Eveniet
          odit quaerat esse aut! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit quos velit itaque quas
          voluptas atque minus nobis cupiditate quisquam ea, ipsum mollitia aliquam? Quod ipsam doloremque alias quia
          exercitationem non.
        </p>
        <template #footer>
          <TButton class="my-6 mx-auto">
            Confirm
          </TButton>
        </template>
      </TModal>
    </div>
    <div class="@flex-center flex-col my-10">
      <div class="mt-7 @card @text-h2 text-center">
        مودال تغییر زبان
      </div>
      <TButton color="secondary" :action="showModal8">
        باز کردن
      </TButton>
      <TModal v-model="modelModel8">
        <TModalLanguage v-model="language" :languages="languages" />
      </TModal>
    </div>

    <div class="@flex-center flex-col my-10">
      <div class="mt-7 @card @text-h2 text-center">
        مودال full & fix height
      </div>
      <TButton color="secondary" :action="showModal9">
        باز کردن
      </TButton>
      <TModal
        v-model="modelModel9"
        fix-height
        full-height
        header
      >
        <template #header>
          <h1 class="p-8 sm:rounded-t-6 text-center @bg-primary-200">
            تست مدال
          </h1>
        </template>
        <p class="m-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur perspiciatis in exercitationem unde?
          Blanditiis, dolorum tempora cupiditate accusamus magni provident sunt deserunt laboriosam minus sed! Quo error
          et corporis obcaecati? Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum perferendis nesciunt
          nostrum consequatur, fugiat rerum eveniet ea veritatis quidem minus animi voluptas tempora! Amet, est! Eveniet
          odit quaerat esse aut! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit quos velit itaque quas
          voluptas atque minus nobis cupiditate quisquam ea, ipsum mollitia aliquam? Quod ipsam doloremque alias quia
          exercitationem non.
        </p>
      </TModal>
    </div>

    <div class="@flex-center flex-col my-10">
      <div class="mt-7 @card @text-h2 text-center">
        تلپورت
      </div>
      <TButton color="secondary" :action="showModal10">
        مودال با تلپورت
      </TButton>
      <TModal
        v-model="modelModel10"
        corners="curve"
      >
        <TeleportModalTest />
      </TModal>
    </div>
  </div>
</template>
