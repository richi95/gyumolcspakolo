import Image from "next/image";
import { MouseEvent, useEffect, useState } from "react";
import { fruitGroupsArr, fruitsArr } from "@/assets/fruits";
import { useRouter } from "next/router";

export default function FruitWrapper() {
  const [active, setActive] = useState<number>(-1);
  const [fruitGroups, setFruitGroups] = useState(fruitGroupsArr);
  const [container1, setContainer1] = useState<string[]>([]);
  const [container2, setContainer2] = useState<string[]>([]);
  const [container3, setContainer3] = useState<string[]>([]);
  const [fruit, setFruit] = useState("");
  const [containerFruit, setContainerFruit] = useState("");
  const [deactiveIndexes, setDeactiveIndexes] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    setFruitGroups(() => {
      const shuffledArr = fruitGroups.sort(() => Math.random() - 0.5);
      const data = shuffledArr.slice(0, 6);
      return data;
    });
  }, []);

  const fnContainer = (arr: string[]) => {
    const data: string[] = [...arr];

    setContainer1(container1.filter((fr) => fr != containerFruit));
    setContainer2(container2.filter((fr) => fr != containerFruit));
    setContainer3(container3.filter((fr) => fr != containerFruit));

    fruitsArr.forEach((value) => {
      if (
        value.split("_")[0] == fruit ||
        (value == containerFruit && !data.includes(containerFruit))
      ) {
        data.push(value);
        setDeactiveIndexes([...deactiveIndexes, active]);
      }
    });
    setContainerFruit("");
    if (arr.length == 2) {
      return arr;
    }
    return data;
  };

  const handleFruit = (fruit: string) => {
    setContainerFruit(fruit);
  };

  const handleContainer = (e: MouseEvent) => {
    switch ((e.target as Element).id) {
      case "1":
        setContainer1(fnContainer(container1));
        break;
      case "2":
        setContainer2(fnContainer(container2));
        break;
      case "3":
        setContainer3(fnContainer(container3));
        break;
    }

    setActive(-1);
    setFruit("");
  };

  const handlePool = (group: string, index: number) => {
    setActive(index);
    setFruit(group.split("_")[0]);
  };

  return (
    <>
      <div className="bg-[url(../../public/images/background.png)]">
        <div className="flex bg-cover h-[600px] items-center">
          <div className="flex justify-around w-full">
            <div
              id="1"
              className="w-[523px] h-[387px] bg-[url(../../public/images/screen.png)] bg-cover flex justify-center items-center hover:cursor-pointer"
              onClick={handleContainer}
            >
              <div className="flex h-[200px]">
                {container1.map((fruit, i) => (
                  <Image
                    key={i}
                    src={`/images/fruits/${fruit}`}
                    width={200}
                    height={200}
                    alt=""
                    onClick={() => handleFruit(fruit)}
                  />
                ))}
              </div>
            </div>
            <div
              id="2"
              className="w-[523px] h-[387px] bg-[url(../../public/images/screen.png)] bg-cover flex justify-center items-center hover:cursor-pointer"
              onClick={handleContainer}
            >
              <div className="flex h-[200px]">
                {container2.map((fruit, i) => (
                  <Image
                    key={i}
                    src={`/images/fruits/${fruit}`}
                    width={200}
                    height={200}
                    alt=""
                    onClick={() => handleFruit(fruit)}
                  />
                ))}
              </div>
            </div>
            <div
              id="3"
              className="w-[523px] h-[387px] bg-[url(../../public/images/screen.png)] bg-cover flex justify-center items-center hover:cursor-pointer"
              onClick={handleContainer}
            >
              <div className="flex h-[200px]">
                {container3.map((fruit, i) => (
                  <Image
                    key={i}
                    src={`/images/fruits/${fruit}`}
                    width={200}
                    height={200}
                    alt=""
                    onClick={() => handleFruit(fruit)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-[url(../../public/images/pool.png)] bg-cover h-[337px] flex items-center">
            <div className="flex justify-around w-full h-[200px]">
              {fruitGroups.map((group, i) => (
                <Image
                  className={`${
                    active == i && "border-[5px] border-dashed border-[#0f0]"
                  } ${
                    deactiveIndexes.includes(i) && "grayscale"
                  } hover:cursor-pointer`}
                  key={i}
                  src={`/images/fruit_groups/${group}`}
                  width={200}
                  height={200}
                  alt=""
                  onClick={() =>
                    !deactiveIndexes.includes(i) ? handlePool(group, i) : null
                  }
                />
              ))}
            </div>
          </div>
        </div>
        {container1.length == 2 &&
          container2.length == 2 &&
          container3.length == 2 && (
            <div
              className="absolute flex justify-center items-center w-full h-full top-0"
              style={{ backgroundColor: "rgba(0, 0, 0, .5)" }}
            >
              <Image
                className="hover:cursor-pointer"
                src="/images/star.svg"
                alt=""
                width={275}
                height={300}
                onClick={() => router.reload()}
              />
            </div>
          )}
      </div>
    </>
  );
}
