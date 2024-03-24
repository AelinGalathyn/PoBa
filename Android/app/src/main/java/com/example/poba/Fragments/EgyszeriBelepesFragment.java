package com.example.poba.Fragments;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentTransaction;
import androidx.navigation.Navigation;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.Toast;

import com.example.poba.R;
import com.example.poba.Users.IUsers;
import com.example.poba.Users.ResponseMessage;
import com.example.poba.Users.UsersInputDto;

import java.util.List;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class EgyszeriBelepesFragment extends Fragment {

    private ImageButton egyszeri_belepes_gomb;
    private EditText felhasznalonev_input;
    private EditText jelszo_input;
    private Retrofit retrofit;
    private OkHttpClient.Builder okBuild;
    private List<String> cookies;
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        View view = inflater.inflate(R.layout.fragment_egyszeri_belepes, container, false);

        Init(view);

        egyszeri_belepes_gomb.setOnClickListener(view2 -> {
            String username = felhasznalonev_input.getText().toString();
            String password = jelszo_input.getText().toString();

            if (!username.isEmpty() || !password.isEmpty()) {
                UsersInputDto user = new UsersInputDto(username, password);
                login(user, view);
            }
        });

        return view;
    }

    public void Init(View view) {
        egyszeri_belepes_gomb = view.findViewById(R.id.egyszeri_belepes_gomb);
        felhasznalonev_input = view.findViewById(R.id.felhasznalonev_input);
        jelszo_input = view.findViewById(R.id.jelszo_input);

        okBuild = new OkHttpClient.Builder();
    }

    public void login(UsersInputDto user, View view) {

        okBuild.addInterceptor(chain -> {
            Request request = chain.request();
            Response response = chain.proceed(request);

            cookies = response.headers("Set-Cookie");

            return response;
        });

        OkHttpClient client = okBuild.build();

        retrofit = new Retrofit.Builder()
                .baseUrl("http://192.168.201.67:3000/")
                .client(client)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        IUsers service = retrofit.create(IUsers.class);
        Call<ResponseMessage> call = service.postLogin(user);
        call.enqueue(new Callback<ResponseMessage>() {
            @Override
            public void onResponse(Call<ResponseMessage> call, retrofit2.Response<ResponseMessage> response) {
                if (response.isSuccessful()) {
                    ResponseMessage loginResponse = response.body();
                    String responseSzoveg = loginResponse.getMessage();
                    Toast.makeText(getActivity(), "Sikeres bejelentkezés", Toast.LENGTH_SHORT).show();

                    Navigation.findNavController(view).navigate(R.id.action_egyszeriBelepesFragment2_to_bejelentkezesFragment);
                } else {
                    Toast.makeText(getActivity(), "Ilyen profil nem létezik", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<ResponseMessage> call, Throwable t) {
                Toast.makeText(getActivity(), t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }
}