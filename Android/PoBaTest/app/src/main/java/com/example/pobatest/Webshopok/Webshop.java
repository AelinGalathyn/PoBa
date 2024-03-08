package com.example.pobatest.Webshopok;

import android.os.Parcel;
import android.os.Parcelable;

import androidx.annotation.NonNull;

public class Webshop implements Parcelable {
    String nev;

    public Webshop(String nev) {
        this.nev = nev;
    }

    protected Webshop(Parcel in) {
        nev = in.readString();
    }

    public static final Creator<Webshop> CREATOR = new Creator<Webshop>() {
        @Override
        public Webshop createFromParcel(Parcel in) {
            return new Webshop(in);
        }

        @Override
        public Webshop[] newArray(int size) {
            return new Webshop[size];
        }
    };

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(@NonNull Parcel dest, int flags) {
        dest.writeString(nev);
    }
}
