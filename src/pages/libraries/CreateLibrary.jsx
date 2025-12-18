import { useState } from "react";
import {
  Button,
  Container,
  PasswordInput,
  Switch,
  TextInput,
} from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { YMaps, Map, ZoomControl, Placemark } from "@pbe/react-yandex-maps";

import { API } from "../../api/API";


const phoneClean = (v) =>
  v.replace(/\D/g, "").replace(/^998/, "").replace(/^0/, "");


const schema = yup.object().shape({
  name: yup.string().required("Ismni kiriting"),
  phone: yup
    .string()
    .required("Telefon raqamni kiriting")
    .transform((val) => (val ? phoneClean(val) : ""))
    .matches(/^\d{9}$/, "Telefon raqam formati: 901234567"),
  password: yup.string().required("Parolni kiriting").min(6),
  address: yup.string().required("Manzilni kiriting"),
  latitude: yup.string().required("Kenglikni kiriting"),
  longitude: yup.string().required("Uzunlikni kiriting"),
  instagram: yup.string().nullable(),
  facebook: yup.string().nullable(),
  telegram: yup.string().nullable(),
  can_rent_books: yup.boolean(),
});


const SectionTitle = ({ title }) => (
  <div className="mt-10 mb-6">
    <h2 className="text-lg font-semibold text-white">{title}</h2>
    <div className=" bg-gray-700 mt-2" />
  </div>
);

const CreateLibrary = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [coords, setCoords] = useState(null);

  const { mutate, isPending } = useMutation({
    mutationFn: (body) => API.post("/auth/register-library/", body),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const body = {
      library: {
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
        can_rent_books: checked,
        social_media: {
          instagram: data.instagram,
          facebook: data.facebook,
          telegram: data.telegram,
        },
      },
      user: {
        name: data.name,
        phone: data.phone,
        password: data.password,
      },
    };

  
  };

  return (
    <Container size="xl" py="xl">
      <div className="p-8 text-white">
        <h1 className="text-2xl font-bold mb-2">Kutubxona qo‘shish</h1>
        <p className="text-gray-400 text-sm">
          Kutubxona va foydalanuvchi maʼlumotlarini kiriting
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <SectionTitle title="Foydalanuvchi ma'lumotlari" />

          <div className="grid grid-cols-3 gap-6">
            <TextInput
              label="Ism"
              placeholder="Foydalanuvchi ismini kiriting"
              {...register("name")}
              error={errors.name?.message}
            />

            <TextInput
              label="Telefon"
              placeholder="Telefon raqamini kiriting"
              {...register("phone")}
              onBlur={(e) => setValue("phone", phoneClean(e.target.value))}
              error={errors.phone?.message}
            />

            <PasswordInput
              label="Parol"
              placeholder="Parolni kiriting"
              {...register("password")}
              error={errors.password?.message}
            />
          </div>

          <SectionTitle title="Kutubxona ma'lumotlari" />

          <div className="grid grid-cols-3 gap-6">
            <TextInput
              label="Manzil"
              {...register("address")}
              error={errors.address?.message}
            />

            <TextInput
              label="Kenglik"
              placeholder="Kenglik koordinatasi"
              {...register("latitude")}
              error={errors.latitude?.message}
            />

            <TextInput
              label="Uzunlik"
              placeholder="Uzunlik koordinatasi"
              {...register("longitude")}
              error={errors.longitude?.message}
            />
          </div>

          <div className="grid grid-cols-3 gap-6 mt-6">
            <TextInput label="Instagram" {...register("instagram")} />
            <TextInput label="Facebook" {...register("facebook")} />
            <TextInput label="Telegram" {...register("telegram")} />
          </div>

          <div className="mt-6">
            <Switch
              label="Kitob ijarasi mavjud"
              checked={checked}
              onChange={(e) => {
                setChecked(e.currentTarget.checked);
                setValue("can_rent_books", e.currentTarget.checked);
              }}
              thumbIcon={
                checked ? <IconCheck size={12} /> : <IconX size={12} />
              }
            />
          </div>

          <SectionTitle title="Joylashuv" />

          <div className="bg-[#121a2a] rounded-xl p-4">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Xaritadan tanlang</span>
              <Button
                size="xs"
                onClick={() =>
                  navigator.geolocation.getCurrentPosition((pos) => {
                    setValue("latitude", pos.coords.latitude);
                    setValue("longitude", pos.coords.longitude);
                  })
                }
              >
                Hozirgi joylashuv
              </Button>
            </div>

            <div className=" rounded-lg overflow-hidden">
              <YMaps query={{ apikey: "3d763bcd-1d38-4d2c-bda0-41deb0997e82" }}>
                <Map
                  defaultState={{ center: [41.2995, 69.2401], zoom: 12 }}
                  width="100%"
                  height="400px"
                  onClick={(e) => {
                    const c = e.get("coords");
                    setCoords(c);
                    setValue("latitude", c[0]);
                    setValue("longitude", c[1]);
                  }}
                >
                  <ZoomControl />
                  {coords && <Placemark geometry={coords} />}
                </Map>
              </YMaps>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-10">
            <Button
              variant="outline"
              color="gray"
              onClick={() => navigate(-1)}
              className="bg-red-600 p-2 rounded-xl"
            >
              Bekor qilish
            </Button>
            <Button
              type="submit"
              loading={isPending}
              className="bg-red-600 p-2 rounded-xl"
            >
              Saqlash
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default CreateLibrary;
