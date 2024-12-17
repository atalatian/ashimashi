import React, { useState, useEffect, useTransition } from "react";

const IndexPage: React.FC = () => {
    const [data, setData] = useState<Record<string, number> | null>(null);
    const [input, setInput] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isPending, startTransition] = useTransition();

    // Dynamically import JSON from assets folder
    useEffect(() => {
        setIsLoading(true);
        import("../../assets/data.json")
            .then((module) => {
                setData(module.default);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error loading JSON file:", err);
                setIsLoading(false);
            });
    }, []);

    // Search result
    const searchResult = input && data ? data[input] : null;

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1 style={{ marginBottom: "20px" }}>قرعه کشی</h1>

            {isLoading ? (
                <p>در حال دریافت اطلاعات...</p>
            ) : (
                <>
                    <input
                        type="text"
                        placeholder="شماره خود را وارد کنید برای مثال 523120349099"
                        value={input}
                        onChange={(e) =>
                            startTransition(() => setInput(e.target.value))
                        }
                        style={{
                            padding: "10px",
                            border: "1px solid #000",
                            width: "350px",
                            fontSize: "16px",
                            marginBottom: "20px",
                        }}
                    />
                    {isPending && <p>در حال جستوجو...</p>}
                    {!isPending && input.length === 12 && (
                        <div>
                            <h2>نتیجه جستوجو</h2>
                            {searchResult !== undefined ? (
                                <p>
                                    <strong>کد ۷ رقمی:</strong> {searchResult}
                                </p>
                            ) : (
                                <p style={{ color: "red" }}>
                                    .کد ۷ رقمی پیدا نشد
                                </p>
                            )}
                        </div>
                    )}

                    {input.length > 0 && input.length > 12 && (
                        <p style={{ color: "gray" }}>
                            لطفا یک شماره ۱۲ رقمی وارد کنید
                        </p>
                    )}
                </>
            )}
        </div>
    );
};

export default IndexPage;
