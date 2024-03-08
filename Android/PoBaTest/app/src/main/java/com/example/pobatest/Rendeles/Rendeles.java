package com.example.pobatest.Rendeles;

import android.os.Parcel;
import android.os.Parcelable;

import androidx.annotation.NonNull;

import java.util.ArrayList;

public class Rendeles implements Parcelable {
    String orderId;
    String rendeloNeve;
    int image;
    ArrayList<String> kosarTartalma;


    public Rendeles(String orderId, int image, String rendeloNeve) {
        this.orderId = orderId;
        this.image = image;
        this.rendeloNeve = rendeloNeve;
        this.kosarTartalma = new ArrayList<>();
    }

    protected Rendeles(Parcel in) {
        orderId = in.readString();
        rendeloNeve = in.readString();
        image = in.readInt();
        kosarTartalma = in.createStringArrayList();
    }

    public static final Creator<Rendeles> CREATOR = new Creator<Rendeles>() {
        @Override
        public Rendeles createFromParcel(Parcel in) {
            return new Rendeles(in);
        }

        @Override
        public Rendeles[] newArray(int size) {
            return new Rendeles[size];
        }
    };

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public int getImage() {
        return image;
    }

    public void setImage(int image) {
        this.image = image;
    }

    public ArrayList<String> getKosarTartalma() {
        return kosarTartalma;
    }

    public void setKosarTartalma(ArrayList<String> kosarTartalma) {
        this.kosarTartalma = kosarTartalma;
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(@NonNull Parcel dest, int flags) {
        dest.writeString(this.orderId);
        dest.writeString(this.rendeloNeve);
        dest.writeInt(this.image);
        dest.writeStringList(this.kosarTartalma);
    }
}
