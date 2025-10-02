// 型定義

export const GetBanksOptions = (char: string, genre: string) => {
    const banksOptions: Record<string, Record<string, BankOption[]>> = {
        "その他銀行": {
            "あ": [{ name: "青森みちのく銀行", code: "ycb" }, { name: "楽天銀行", code: "rkt" }, { name: "三菱UFJ銀行", code: "ufj" }],
            "い": [{ name: "三井住友銀行", code: "mti" }, { name: "りそな銀行", code: "rsn" }, { name: "セブン銀行", code: "svn" }],
            "う": [{ name: "住信SBIネット銀行", code: "sbi" }, { name: "auじぶん銀行", code: "jbn" }, { name: "イオン銀行", code: "ion" }],
            "え": [{ name: "みずほ銀行", code: "mzh" }, { name: "三菱東京UFJ銀行", code: "mti" }, { name: "三井住友銀行", code: "mti" }],
            "お": [{ name: "りそな銀行", code: "rsn" }, { name: "セブン銀行", code: "svn" }, { name: "住信SBIネット銀行", code: "sbi" }],
        },
        "信用金庫": {
            "あ": [{ name: "ゆうちょ銀行", code: "ycb" }, { name: "楽天銀行", code: "rkt" }, { name: "三菱UFJ銀行", code: "ufj" }],
            "い": [{ name: "三井住友銀行", code: "mti" }, { name: "りそな銀行", code: "rsn" }, { name: "セブン銀行", code: "svn" }],
            "う": [{ name: "住信SBIネット銀行", code: "sbi" }, { name: "auじぶん銀行", code: "jbn" }, { name: "イオン銀行", code: "ion" }],
            "え": [{ name: "みずほ銀行", code: "mzh" }, { name: "三菱東京UFJ銀行", code: "mti" }, { name: "三井住友銀行", code: "mti" }],
            "お": [{ name: "りそな銀行", code: "rsn" }, { name: "セブン銀行", code: "svn" }, { name: "住信SBIネット銀行", code: "sbi" }],
        },
        "信用組合": {
            "あ": [{ name: "ゆうちょ銀行", code: "ycb" }, { name: "楽天銀行", code: "rkt" }, { name: "三菱UFJ銀行", code: "ufj" }],
            "い": [{ name: "三井住友銀行", code: "mti" }, { name: "りそな銀行", code: "rsn" }, { name: "セブン銀行", code: "svn" }],
            "う": [{ name: "住信SBIネット銀行", code: "sbi" }, { name: "auじぶん銀行", code: "jbn" }, { name: "イオン銀行", code: "ion" }],
            "え": [{ name: "みずほ銀行", code: "mzh" }, { name: "三菱東京UFJ銀行", code: "mti" }, { name: "三井住友銀行", code: "mti" }],
            "お": [{ name: "りそな銀行", code: "rsn" }, { name: "セブン銀行", code: "svn" }, { name: "住信SBIネット銀行", code: "sbi" }],
        },
        "農協": {
            "あ": [{ name: "ゆうちょ銀行", code: "ycb" }, { name: "楽天銀行", code: "rkt" }, { name: "三菱UFJ銀行", code: "ufj" }],
            "い": [{ name: "三井住友銀行", code: "mti" }, { name: "りそな銀行", code: "rsn" }, { name: "セブン銀行", code: "svn" }],
            "う": [{ name: "住信SBIネット銀行", code: "sbi" }, { name: "auじぶん銀行", code: "jbn" }, { name: "イオン銀行", code: "ion" }],
            "え": [{ name: "みずほ銀行", code: "mzh" }, { name: "三菱東京UFJ銀行", code: "mti" }, { name: "三井住友銀行", code: "mti" }],
            "お": [{ name: "りそな銀行", code: "rsn" }, { name: "セブン銀行", code: "svn" }, { name: "住信SBIネット銀行", code: "sbi" }],
        },
        "漁協": {
            "あ": [{ name: "ゆうちょ銀行", code: "ycb" }, { name: "楽天銀行", code: "rkt" }, { name: "三菱UFJ銀行", code: "ufj" }],
            "い": [{ name: "三井住友銀行", code: "mti" }, { name: "りそな銀行", code: "rsn" }, { name: "セブン銀行", code: "svn" }],
            "う": [{ name: "住信SBIネット銀行", code: "sbi" }, { name: "auじぶん銀行", code: "jbn" }, { name: "イオン銀行", code: "ion" }],
            "え": [{ name: "みずほ銀行", code: "mzh" }, { name: "三菱東京UFJ銀行", code: "mti" }, { name: "三井住友銀行", code: "mti" }],
            "お": [{ name: "りそな銀行", code: "rsn" }, { name: "セブン銀行", code: "svn" }, { name: "住信SBIネット銀行", code: "sbi" }],
        },
        "労働金庫": {
            "あ": [{ name: "ゆうちょ銀行", code: "ycb" }, { name: "楽天銀行", code: "rkt" }, { name: "三菱UFJ銀行", code: "ufj" }],
            "い": [{ name: "三井住友銀行", code: "mti" }, { name: "りそな銀行", code: "rsn" }, { name: "セブン銀行", code: "svn" }],
            "う": [{ name: "住信SBIネット銀行", code: "sbi" }, { name: "auじぶん銀行", code: "jbn" }, { name: "イオン銀行", code: "ion" }],
            "え": [{ name: "みずほ銀行", code: "mzh" }, { name: "三菱東京UFJ銀行", code: "mti" }, { name: "三井住友銀行", code: "mti" }],
            "お": [{ name: "りそな銀行", code: "rsn" }, { name: "セブン銀行", code: "svn" }, { name: "住信SBIネット銀行", code: "sbi" }],
        },
    };

    if (!banksOptions[genre]) {
        return [];
    }

    if (!banksOptions[genre][char]) {
        return [];
    }

    return banksOptions[genre][char] || [];
}