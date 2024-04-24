package com.example.pobatest.Rendeles;

import android.os.Parcel;
import android.os.Parcelable;

import androidx.annotation.NonNull;

import org.json.JSONException;
import org.json.JSONObject;

public class RendelesTermek implements Parcelable {
    public Integer id;
    public String sku;

    public String name;
    public String unit;
    public Double qty;
    public Double net;
    public Integer gross;
    public String vat;
    public String status;

    public RendelesTermek(JSONObject object) throws JSONException {
        id = object.getInt("id");
        sku = object.getString("sku");
        name = object.getString("name");
        unit = object.getString("unit");
        qty = object.getDouble("quantity");
        net = object.getDouble("net");
        gross = object.getInt("gross");
        vat = object.getString("vat");
        status = object.getString("status");
    }

    protected RendelesTermek(Parcel in) {
        id = (in.readByte() == 0) ? null : in.readInt();
        sku = in.readString();
        name = in.readString();
        unit = in.readString();
        qty = (in.readByte() == 0) ? null : in.readDouble();
        net = (in.readByte() == 0) ? null : in.readDouble();
        gross = (in.readByte() == 0) ? null : in.readInt();
        vat = in.readString();
        status = in.readString();
    }

    @Override
    public void writeToParcel(@NonNull Parcel dest, int flags) {
        dest.writeByte(id == null ? (byte) 0 : (byte) 1); if (id != null) dest.writeInt(id);
        dest.writeString(sku);
        dest.writeString(name);
        dest.writeString(unit);
        dest.writeByte(qty == null ? (byte) 0 : (byte) 1); if (qty != null) dest.writeDouble(qty);
        dest.writeByte(net == null ? (byte) 0 : (byte) 1); if (net != null) dest.writeDouble(net);
        dest.writeByte(gross == null ? (byte) 0 : (byte) 1); if (gross != null) dest.writeInt(gross);
        dest.writeString(vat);
        dest.writeString(status);
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public static final Creator<RendelesTermek> CREATOR = new Creator<RendelesTermek>() {
        @Override
        public RendelesTermek createFromParcel(Parcel in) {
            return new RendelesTermek(in);
        }

        @Override
        public RendelesTermek[] newArray(int size) {
            return new RendelesTermek[size];
        }
    };
}
